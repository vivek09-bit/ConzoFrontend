const JpgToPdf = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">JPG to PDF Converter</h1>
      <p className="mb-8">Convert your JPG images to PDF format easily.</p>
      <form className="w-full max-w-md">
        <input
          type="file"
          accept=".jpg,.jpeg"
          className="mb-4 p-2 border border-gray-700 rounded bg-gray-800 text-gray-100 w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert to PDF
        </button>
      </form>
    </div>
  );
}   
export default JpgToPdf;