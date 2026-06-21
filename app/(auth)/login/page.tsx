"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/useAuth"
import { ApiError } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid clinical or patient email address."),
  password: z
    .string()
    .min(
      8,
      "Security protocols require passwords to be at least 8 characters."
    ),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginForm() {
  const { login, user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
  })

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get("redirect") || "/dashboard"
      router.push(redirectUrl)
    }
  }, [user, router, searchParams])

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      await login(values.email, values.password)
      toast.success("Access Granted", {
        description:
          "Welcome to the National Institute of Neurosciences Portal.",
      })
      const redirectUrl = searchParams.get("redirect") || "/dashboard"
      router.push(redirectUrl)
    } catch (error) {
      const messages =
        error instanceof ApiError
          ? error.messages
          : ["Incorrect email or credentials."]
      messages.forEach((msg) => {
        toast.error("Authentication Failed", {
          description: msg,
        })
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      {/* Background soft teal wash decoration */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-100 bg-linear-to-b from-primary/5 to-transparent" />

      <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-card">
        {/* Decorative teal border top line */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-linear-to-r from-primary to-info" />

        <CardHeader className="space-y-2 pt-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <CardTitle className="pt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
            NINS Gateway
          </CardTitle>
          <CardDescription className="mx-auto max-w-70 text-xs leading-relaxed text-muted-foreground">
            Authorize credentials to access outpatient booking, clinical queue,
            and medical charts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@nins.gov.bd or patient@mail.com"
                className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-slate-200"
                }`}
                disabled={isSubmitting || isLoading}
                {...registerField("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-foreground"
                >
                  Security Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pr-10 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                    errors.password
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-slate-200"
                  }`}
                  disabled={isSubmitting || isLoading}
                  {...registerField("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/95 active:scale-[0.98]"
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

        <CardFooter className="flex flex-col space-y-2 rounded-b-2xl border-t border-slate-50 bg-slate-50/50 p-6 text-center text-xs text-muted-foreground dark:border-white/5 dark:bg-muted/10">
          <div>
            Need outpatient hospital serial?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary underline-offset-2 transition-all hover:underline"
            >
              Create patient file
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

/**
 * `useSearchParams()` opts the route into client-side rendering during static
 * prerendering, so the form must sit inside a <Suspense> boundary or the
 * production build fails (CSR bailout). See:
 * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 */
export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  )
}
