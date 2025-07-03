import Image from "next/image";

export default function ServerDownPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-center p-6">
      <Image
        src="https://cdn-images-1.medium.com/max/554/1*HubVHOjxeedL-tl3ndPHFA.gif"
        alt="Server Down"
        width={300}
        height={200}
        className="mb-6 animate-pulse"
        unoptimized
      />
      <h1 className="text-4xl font-bold text-red-600 mb-2 animate-fadeIn">
        Server is Down
      </h1>
      <p className="text-lg text-gray-300 animate-fadeIn delay-200">
        Our team is working on it. <br />
        Please check back soon.
      </p>
    </div>
  );
}
