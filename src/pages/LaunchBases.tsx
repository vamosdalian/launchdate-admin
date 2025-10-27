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
import type { LaunchBase } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { launchBaseService } from '@/services';

export default function LaunchBases() {
  const [bases, setBases] = useState<LaunchBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<LaunchBase>>({
    name: '',
    location: '',
    country: '',
    description: '',
    imageUrl: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await launchBaseService.getAll();
      setBases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch launch bases');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      if (editingId) {
        await launchBaseService.update(editingId, formData);
      } else {
        // Validate required fields before creating
        if (!formData.name || !formData.location || !formData.country) {
          setError('Please fill in all required fields');
          return;
        }
        await launchBaseService.create(formData as Omit<LaunchBase, 'id'>);
      }
      await fetchBases();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save launch base');
    }
  };

  const handleEdit = (base: LaunchBase) => {
    setFormData(base);
    setEditingId(base.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this launch base?')) {
      try {
        setError(null);
        await launchBaseService.delete(id);
        await fetchBases();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete launch base');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      country: '',
      description: '',
      imageUrl: '',
      latitude: 0,
      longitude: 0,
    });
    setEditingId(null);
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Launch Bases</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Launch Base
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
            <CardTitle>{editingId ? 'Edit Launch Base' : 'Add New Launch Base'}</CardTitle>
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
                  <label className="text-sm font-medium mb-2 block">Country</label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Latitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Longitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Image URL</label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
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
            <div className="p-8 text-center">Loading launch bases...</div>
          ) : bases.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No launch bases found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bases.map((base) => (
                  <TableRow key={base.id}>
                    <TableCell className="font-medium">{base.name}</TableCell>
                    <TableCell>{base.location}</TableCell>
                    <TableCell>{base.country}</TableCell>
                    <TableCell>{base.latitude.toFixed(4)}, {base.longitude.toFixed(4)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(base)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(base.id)}
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
