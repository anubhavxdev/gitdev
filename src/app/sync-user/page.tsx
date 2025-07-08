import { db } from '../../server/db';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

export default async function SyncUserPage() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User not Found');
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
        return notFound();
    }

    const existingUser = await db.user.findUnique({
        where: {
            emailAddress: email
        }
    });

    if (existingUser) {
        await db.user.update({
            where: {
                emailAddress: email
            },
            data: {
                imageUrl: user.imageUrl,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    } else {
        await db.user.create({
            data: {
                id: user.id,
                emailAddress: email,
                imageUrl: user.imageUrl,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    }

   return redirect('/dashboard');
}
