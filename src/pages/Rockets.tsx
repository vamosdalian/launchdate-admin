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
import type { Rocket, Company } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { rocketService, companyService } from '@/services';

export default function Rockets() {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Rocket>>({
    name: '',
    description: '',
    height: 0,
    diameter: 0,
    mass: 0,
    company_id: undefined,
    imageUrl: '',
    active: true,
  });

  useEffect(() => {
    fetchRockets();
    fetchCompanies();
  }, []);

  const fetchRockets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rocketService.getAll();
      setRockets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rockets');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      if (editingId) {
        await rocketService.update(editingId, formData);
      } else {
        // Validate required fields before creating
        if (!formData.name || !formData.description) {
          setError('Please fill in all required fields');
          return;
        }
        await rocketService.create(formData as Omit<Rocket, 'id' | 'created_at' | 'updated_at'>);
      }
      await fetchRockets();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save rocket');
    }
  };

  const handleEdit = (rocket: Rocket) => {
    setFormData(rocket);
    setEditingId(rocket.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this rocket?')) {
      try {
        setError(null);
        await rocketService.delete(id);
        await fetchRockets();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete rocket');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      height: 0,
      diameter: 0,
      mass: 0,
      company_id: undefined,
      imageUrl: '',
      active: true,
    });
    setEditingId(null);
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rockets</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rocket
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
            <CardTitle>{editingId ? 'Edit Rocket' : 'Add New Rocket'}</CardTitle>
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
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <select
                    value={formData.company_id || ''}
                    onChange={(e) => setFormData({ ...formData, company_id: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a company (optional)</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
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
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Height (m)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Diameter (m)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mass (kg)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.mass}
                    onChange={(e) => setFormData({ ...formData, mass: parseFloat(e.target.value) || 0 })}
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
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="h-4 w-4"
                />
                <label htmlFor="active" className="text-sm font-medium">Active</label>
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
            <div className="p-8 text-center">Loading rockets...</div>
          ) : rockets.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No rockets found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Height (m)</TableHead>
                  <TableHead>Diameter (m)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rockets.map((rocket) => (
                  <TableRow key={rocket.id}>
                    <TableCell className="font-medium">{rocket.name}</TableCell>
                    <TableCell>{rocket.company || 'N/A'}</TableCell>
                    <TableCell>{rocket.height}</TableCell>
                    <TableCell>{rocket.diameter}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${rocket.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {rocket.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(rocket)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(rocket.id)}
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
