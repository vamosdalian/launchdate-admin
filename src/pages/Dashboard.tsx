import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Calendar, Newspaper, MapPin, Building2 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Rockets', value: '4', icon: Rocket, color: 'text-blue-600' },
    { label: 'Upcoming Launches', value: '5', icon: Calendar, color: 'text-green-600' },
    { label: 'News Articles', value: '3', icon: Newspaper, color: 'text-purple-600' },
    { label: 'Launch Bases', value: '4', icon: MapPin, color: 'text-orange-600' },
    { label: 'Companies', value: '4', icon: Building2, color: 'text-red-600' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to LaunchDate Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage your rocket launch data, news, companies, and launch bases from this admin panel.
            Use the sidebar navigation to access different sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
