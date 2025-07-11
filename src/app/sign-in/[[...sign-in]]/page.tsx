import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black bg-cover bg-center bg-no-repeat flex justify-center items-center p-4"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
          url("https://wallpapercave.com/wp/wp3082255.jpg")
        `
      }}
    >
    <div className="flex flex-wrap max-w-5xl w-full bg-zinc-900/80 bg-opacity-90 rounded-lg overflow-hidden border-2 border-zinc-800 shadow-2xl">
      
        {/* Left Side */}
        <div className="flex-1 min-w-[300px] max-w-1/2 flex justify-center items-center p-12 border-r border-zinc-800">
          <h1 className="text-5xl font-bold text-center leading-snug bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
            Welcome to <br /> GitDev
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex-1 min-w-[300px] max-w-1/2 flex justify-center items-center p-12">
          <div className="w-full max-w-sm">
            <SignIn
              path="/sign-in"
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
