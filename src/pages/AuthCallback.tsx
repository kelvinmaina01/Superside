import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const processedRef = useRef(false);

    useEffect(() => {
        // Prevent double execution in React Strict Mode
        if (processedRef.current) return;
        processedRef.current = true;

        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
            toast({
                title: "Authentication Failed",
                description: "GitHub access was denied.",
                variant: "destructive",
            });
            navigate('/login');
            return;
        }

        if (code) {
            const handleGithubLogin = async () => {
                try {
                    await authService.loginWithGithub(code);
                    toast({
                        title: "Success",
                        description: "Successfully logged in with GitHub!",
                    });
                    navigate('/dashboard'); // or wherever you want to go
                } catch (err: any) {
                    console.error("Github Login Error:", err);
                    toast({
                        title: "Login Failed",
                        description: "Could not authenticate with GitHub.",
                        variant: "destructive",
                    });
                    navigate('/login');
                }
            };

            handleGithubLogin();
        } else {
            navigate('/login');
        }
    }, [location, navigate, toast]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Authenticating...
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please wait while we verify your GitHub account.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthCallback;
