import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center bg-no-repeat flex justify-center items-center p-4 animate-fadeIn"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
          url("https://wallpapercave.com/wp/wp3082255.jpg")
        `,
      }}
    >
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-zinc-900/80 rounded-lg overflow-hidden border-2 border-zinc-800 shadow-2xl">
        {/* Left Side */}
        <div className="flex-1 flex justify-center items-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6">Join GitDev</h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            <SignUp
              path="/sign-up"
              routing="path"
              redirectUrl="/features"
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none border-none",
                  formButtonPrimary: "bg-red-600 hover:bg-red-700 text-white font-semibold",
                  headerTitle: "text-lg text-white",
                  headerSubtitle: "text-sm text-gray-300",
                  socialButtonsBlockButton: "bg-zinc-800 text-white hover:bg-zinc-700",
                  formFieldInput: "bg-black text-white border border-zinc-600",
                  footerActionText: "text-gray-400",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
