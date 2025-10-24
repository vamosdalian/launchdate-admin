import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Launch } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { launchService } from '@/services';

export default function Launches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Launch>>({
    name: '',
    date: '',
    rocket: '',
    launchBase: '',
    status: 'scheduled',
    description: '',
  });

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await launchService.getAll();
      setLaunches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch launches');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      if (editingId) {
        await launchService.update(editingId, formData);
      } else {
        // Validate required fields before creating
        if (!formData.name || !formData.date || !formData.rocket || !formData.launchBase) {
          setError('Please fill in all required fields');
          return;
        }
        await launchService.create(formData as Omit<Launch, 'id'>);
      }
      await fetchLaunches();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save launch');
    }
  };

  const handleEdit = (launch: Launch) => {
    setFormData(launch);
    setEditingId(launch.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this launch?')) {
      try {
        setError(null);
        await launchService.delete(id);
        await fetchLaunches();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete launch');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      rocket: '',
      launchBase: '',
      status: 'scheduled',
      description: '',
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'successful':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Launches</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Launch
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {isEditing && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Launch' : 'Add New Launch'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Input
                    type="datetime-local"
                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rocket</label>
                  <Input
                    value={formData.rocket}
                    onChange={(e) => setFormData({ ...formData, rocket: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Launch Base</label>
                  <Input
                    value={formData.launchBase}
                    onChange={(e) => setFormData({ ...formData, launchBase: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Launch['status'] })}
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="successful">Successful</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">Loading launches...</div>
          ) : launches.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No launches found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rocket</TableHead>
                  <TableHead>Launch Base</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {launches.map((launch) => (
                  <TableRow key={launch.id}>
                    <TableCell className="font-medium">{launch.name}</TableCell>
                    <TableCell>{formatDate(launch.date)}</TableCell>
                    <TableCell>{launch.rocket}</TableCell>
                    <TableCell>{launch.launchBase}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(launch.status)}`}>
                        {launch.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(launch)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(launch.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
