"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid clinical or patient email address."),
  password: z.string().min(8, "Security protocols require passwords to be at least 8 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get("redirect") || "/dashboard";
      router.push(redirectUrl);
    }
  }, [user, router, searchParams]);

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast.success("Access Granted", {
        description: "Welcome to the National Institute of Neurosciences Portal.",
      });
      const redirectUrl = searchParams.get("redirect") || "/dashboard";
      router.push(redirectUrl);
    } catch (error: any) {
      const messages = error.messages || ["Incorrect email or credentials."];
      messages.forEach((msg: string) => {
        toast.error("Authentication Failed", {
          description: msg,
        });
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      {/* Background soft teal wash decoration */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <Card className="w-full max-w-md border border-slate-100 bg-white rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-card">
        {/* Decorative teal border top line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-info" />
        
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground pt-2">
            NINS Gateway
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs leading-relaxed max-w-[280px] mx-auto">
            Authorize credentials to access outpatient booking, clinical queue, and medical charts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@nins.gov.bd or patient@mail.com"
                className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                  errors.email ? "border-destructive focus-visible:ring-destructive" : "border-slate-200"
                }`}
                disabled={isSubmitting || isLoading}
                {...registerField("email")}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Security Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pr-10 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                    errors.password ? "border-destructive focus-visible:ring-destructive" : "border-slate-200"
                  }`}
                  disabled={isSubmitting || isLoading}
                  {...registerField("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center justify-center gap-2 h-10 transition-all duration-200 active:scale-[0.98]"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Authenticate Session"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 border-t border-slate-50 bg-slate-50/50 p-6 text-center text-xs text-muted-foreground rounded-b-2xl dark:border-white/5 dark:bg-muted/10">
          <div>
            Need outpatient hospital serial?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline transition-all underline-offset-2"
            >
              Create patient file
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
