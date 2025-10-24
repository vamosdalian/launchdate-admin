import { useState } from 'react';
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
import type { Rocket } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Rockets() {
  const [rockets, setRockets] = useState<Rocket[]>([
    {
      id: '1',
      name: 'Falcon 9',
      description: 'A reusable, two-stage rocket designed and manufactured by SpaceX.',
      height: 70,
      diameter: 3.7,
      mass: 549054,
      company: 'SpaceX',
      imageUrl: 'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=Falcon+9',
      active: true,
    },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Rocket>>({
    name: '',
    description: '',
    height: 0,
    diameter: 0,
    mass: 0,
    company: '',
    imageUrl: '',
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setRockets(rockets.map(r => r.id === editingId ? { ...formData, id: editingId } as Rocket : r));
    } else {
      const newRocket: Rocket = {
        ...formData,
        id: Date.now().toString(),
      } as Rocket;
      setRockets([...rockets, newRocket]);
    }
    
    resetForm();
  };

  const handleEdit = (rocket: Rocket) => {
    setFormData(rocket);
    setEditingId(rocket.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this rocket?')) {
      setRockets(rockets.filter(r => r.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      height: 0,
      diameter: 0,
      mass: 0,
      company: '',
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
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
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
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Diameter (m)</label>
                  <Input
                    type="number"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mass (kg)</label>
                  <Input
                    type="number"
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
                  <TableCell>{rocket.company}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
