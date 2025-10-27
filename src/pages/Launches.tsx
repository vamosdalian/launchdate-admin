import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import { Trash2, RefreshCw } from 'lucide-react';
import { launchService } from '@/services';

export default function Launches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      setSuccessMessage(null);
      const result = await launchService.sync(50);
      setSuccessMessage(`Successfully synced ${result.count} launches`);
      await fetchLaunches();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync launches');
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (id: number) => {
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
        <div className="flex gap-2">
          <Button onClick={handleSync} disabled={syncing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync from API'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Rocket Launches</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">Loading launches...</div>
          ) : launches.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No launches found. Click "Sync from API" to fetch launches.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {launches.map((launch) => (
                  <TableRow key={launch.id}>
                    <TableCell className="font-medium">{launch.name}</TableCell>
                    <TableCell>{formatDate(launch.launch_date)}</TableCell>
                    <TableCell>{launch.provider?.name || 'N/A'}</TableCell>
                    <TableCell>{launch.vehicle?.name || 'N/A'}</TableCell>
                    <TableCell>
                      {launch.pad?.location?.name || launch.pad?.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(launch.status)}`}>
                        {launch.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(launch.id)}
                        title="Delete launch"
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
