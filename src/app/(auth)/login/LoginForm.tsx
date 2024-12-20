"use client"

import { loginSchema, LoginValues, registerShcema, RegisterValues } from '@/lib/validations'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginAction } from './actions'
import { PasswordInput } from '@/components/PasswordInput'
import LoadingButton from '@/components/LoadingButton'

const LoginForm = () => {

    const [error, setError] = useState<string>()
    const [isPending, startTransition] = useTransition();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = (values: LoginValues) => {
        setError(undefined)
        startTransition(async () => {
            const { error } = await loginAction(values)

            if (error) setError(error)

        })
    }
    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                {error && <p className='text-center text-destructive'>{error}</p>}
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='pt-2'>
                    <LoadingButton loading={isPending} type='submit' className='w-full '>
                        Login
                    </LoadingButton>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm