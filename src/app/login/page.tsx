'use client';

import { useActionState, useEffect } from 'react';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Admin Login</CardTitle>
            <CardDescription className="text-center"> </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-2">
                  <Input id="email" name="email" type="email" required defaultValue="admin@cafestreet.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input id="password" name="password" type="password" required defaultValue="cafestreet@123" />
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
