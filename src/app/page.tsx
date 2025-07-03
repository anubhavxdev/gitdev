import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <>
      <nav
        style={{
          width: '100%',
          backgroundColor: '#1a1a1a',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ color: 'red', fontWeight: 'bold', fontSize: '2rem', letterSpacing: '1px' }}>GitDev</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>Home</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>Features</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>About</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}>Contact</a>
          </div>
        </div>
      </nav>


      <div style={{ height: '64px' }} />
      <div
        className="flex min-h-screen flex-col items-center justify-between p-24"
        style={{
          backgroundColor: 'black',
          backgroundImage: `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url("https://wallpapercave.com/wp/wp3082255.jpg")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <h1 style={{ color: 'red', fontSize: '5rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '24px' }}>
          GitDev
        </h1>
        <div>
        <h2 style={{ color: 'white' }}>Welcome to GitDev</h2>
        <p style={{ color: 'white' }}>Your personal GitHub repository management tool.</p>
        <p style={{ color: 'white' }}>Explore, manage, and enhance your coding projects with ease.</p>
        <p style={{ color: 'white' }}>Stay tuned for more features!</p>
        <p style={{ color: 'white' }}>Happy coding!</p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <span
          style={{
            display: 'inline-block',
            fontWeight: 'bold',
            fontSize: '2rem',
            background: 'linear-gradient(90deg, #ff512f, #dd2476, #1fa2ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginTop: '16px',
            letterSpacing: '2px',
          }}
          >
          Coming Soon
          </span>
        </div>
        </div>
        <Button className="mt-4" style={{ backgroundColor: 'red', color: 'white' }}>
          Get Started
        </Button>

        <footer
          style={{
            color: 'white',
            backgroundColor: '#1a1a1a',
            padding: '16px 0',
            width: '100vw',
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p>© 2023 GitDev. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span>Built with ❤️ by </span>
            <Avatar>
              <AvatarImage src="https://github.com/anubhavxdev.png" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <span>Anubhav aka "Logic"</span>
          </div>
        </footer>
      </div>
    </>
  );
}
