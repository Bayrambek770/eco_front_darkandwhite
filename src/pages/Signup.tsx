import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/api/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
  await AuthService.signup({ username, password, email: email || undefined, password_confirm: password2 });
      // optionally auto-login, but keep it simple
      navigate('/login');
    } catch (e) {
      // Try to surface backend validation errors
      const msg = (e as any)?.response?.data;
      if (msg && typeof msg === 'object') {
        const parts = Object.entries(msg).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`);
        setError(parts.join(' | '));
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <Input type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Input type="password" placeholder="Confirm password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
            <Button variant="ghost" asChild className="w-full">
              <Link to="/">Back</Link>
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
