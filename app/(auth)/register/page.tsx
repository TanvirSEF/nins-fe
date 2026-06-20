"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { UserPlus, Eye, EyeOff, Loader2 } from "lucide-react"

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[+0-9]{11,15}$/.test(val), {
        message: "Please enter a valid mobile number (e.g. 01712345678).",
      }),
    password: z
      .string()
      .min(
        8,
        "Security protocols require passwords to be at least 8 characters."
      ),
    confirmPassword: z.string().min(8, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const { register: signup, user, isLoading } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true)
    try {
      await signup(values.name, values.email, values.password, values.phone)
      toast.success("Account Created", {
        description: "Welcome! Your NINS patient profile has been registered.",
      })
      router.push("/dashboard")
    } catch (error) {
      const messages =
        error instanceof ApiError
          ? error.messages
          : ["Registration failed. Email may already be in use."]
      messages.forEach((msg) => {
        toast.error("Registration Failed", {
          description: msg,
        })
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-[400px] bg-gradient-to-b from-primary/5 to-transparent" />

      <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-card">
        {/* Decorative top border line */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary to-info" />

        <CardHeader className="space-y-2 pt-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlus className="h-6 w-6" />
          </div>
          <CardTitle className="pt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
            Create Patient File
          </CardTitle>
          <CardDescription className="mx-auto max-w-[280px] text-xs leading-relaxed text-muted-foreground">
            Register your profile to book appointments, consult clinicians, and
            download test reports.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Hasan Mahmud"
                className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                  errors.name
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-slate-200"
                }`}
                disabled={isSubmitting || isLoading}
                {...registerField("name")}
              />
              {errors.name && (
                <p className="mt-0.5 text-xs font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. hasan@mail.com"
                className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-slate-200"
                }`}
                disabled={isSubmitting || isLoading}
                {...registerField("email")}
              />
              {errors.email && (
                <p className="mt-0.5 text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="phone"
                className="flex items-center justify-between text-xs font-semibold text-foreground"
              >
                Mobile Number
                <span className="text-[10px] font-normal text-muted-foreground">
                  Optional
                </span>
              </Label>
              <Input
                id="phone"
                placeholder="e.g. 01712345678"
                className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                  errors.phone
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-slate-200"
                }`}
                disabled={isSubmitting || isLoading}
                {...registerField("phone")}
              />
              {errors.phone && (
                <p className="mt-0.5 text-xs font-medium text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold text-foreground"
                >
                  Password
                </Label>
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
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                    disabled={isSubmitting || isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-0.5 text-xs font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-foreground"
                >
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary ${
                    errors.confirmPassword
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-slate-200"
                  }`}
                  disabled={isSubmitting || isLoading}
                  {...registerField("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-0.5 text-xs font-medium text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-3 flex h-10 w-full items-center justify-center gap-2 bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/95 active:scale-[0.98]"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating File...
                </>
              ) : (
                "Register Patient File"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 rounded-b-2xl border-t border-slate-50 bg-slate-50/50 p-6 text-center text-xs text-muted-foreground dark:border-white/5 dark:bg-muted/10">
          <div>
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline-offset-2 transition-all hover:underline"
            >
              Gateway Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
