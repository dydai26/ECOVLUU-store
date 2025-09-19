import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/context/AdminContext';
import { 
  Home, 
  FileText, 
  Image, 
  Layout, 
  LogOut, 
  Settings,
  Edit3,
  Plus,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAuthenticated, user, logout } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const mockPages = [
    { id: 1, title: 'Home', url: '/', status: 'published' },
    { id: 2, title: 'About', url: '/about', status: 'published' },
    { id: 3, title: 'Shop', url: '/shop', status: 'published' },
    { id: 4, title: 'Contact', url: '/contact', status: 'published' },
  ];

  const mockBanners = [
    { id: 1, title: 'Hero Banner', location: 'Homepage', image: '/baner-home.jpg' },
    { id: 2, title: 'About Banner', location: 'About page', image: '/about_baner.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container-custom flex h-16 items-center justify-between">
    <div className="flex items-center space-x-4">
      {/* Логотип як картинка з посиланням */}
      <a href="/">
        <img 
          src="/intro.png" 
          alt="ECOVLUU Logo" 
          className="h-8 w-auto" 
        />
      </a>

      <h1 className="text-xl font-bold text-foreground">
        ECOVLUU Admin
      </h1>
    </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Banners
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+7 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
                  <Layout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">All banners active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Today</div>
                  <p className="text-xs text-muted-foreground">Homepage banner</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Updated hero banner</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Added new product images</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Updated About page content</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Pages Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Page
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockPages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">{page.title}</h3>
                        <p className="text-sm text-muted-foreground">{page.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {page.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Edit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input id="page-title" placeholder="Enter page title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page-content">Content</Label>
                  <Textarea id="page-content" placeholder="Enter page content" rows={6} />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Library</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upload Media
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['/img1.jpg', '/img3.jpg', '/aloe.jpg', '/amino.jpg', '/keratin.jpg', '/safron.jpg'].map((img, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square bg-muted">
                    <img 
                      src={img} 
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{img.split('/').pop()}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Banners Tab */}
          <TabsContent value="banners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Banner Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Banner
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockBanners.map((banner) => (
                <Card key={banner.id}>
                  <div className="aspect-video bg-muted">
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{banner.location}</p>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Banner Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-title">Banner Title</Label>
                  <Input id="banner-title" placeholder="Enter banner title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-text">Banner Text</Label>
                  <Textarea id="banner-text" placeholder="Enter banner text" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-link">Link URL</Label>
                  <Input id="banner-link" placeholder="Enter link URL" />
                </div>
                <Button>Update Banner</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;