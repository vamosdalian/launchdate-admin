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
import type { News as NewsType } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function News() {
  const [news, setNews] = useState<NewsType[]>([
    {
      id: '1',
      title: 'SpaceX Completes 200th Successful Landing',
      summary: 'SpaceX has achieved another milestone with its 200th successful booster landing.',
      content: '# SpaceX Achieves Historic 200th Successful Landing\n\nSpaceX has reached a remarkable milestone...',
      date: '2025-10-20T12:00:00Z',
      url: 'https://www.spacex.com',
      imageUrl: 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=SpaceX+Landing',
    },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NewsType>>({
    title: '',
    summary: '',
    content: '',
    date: '',
    url: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setNews(news.map(n => n.id === editingId ? { ...formData, id: editingId } as NewsType : n));
    } else {
      const newNews: NewsType = {
        ...formData,
        id: Date.now().toString(),
      } as NewsType;
      setNews([...news, newNews]);
    }
    
    resetForm();
  };

  const handleEdit = (newsItem: NewsType) => {
    setFormData(newsItem);
    setEditingId(newsItem.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      date: '',
      url: '',
      imageUrl: '',
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">News</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </Button>
      </div>

      {isEditing && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit News' : 'Add New News'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Summary</label>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  required
                  rows={2}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content (Markdown)</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Input
                    type="datetime-local"
                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">URL</label>
                  <Input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((newsItem) => (
                <TableRow key={newsItem.id}>
                  <TableCell className="font-medium">{newsItem.title}</TableCell>
                  <TableCell>{formatDate(newsItem.date)}</TableCell>
                  <TableCell>
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Link
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(newsItem)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(newsItem.id)}
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
