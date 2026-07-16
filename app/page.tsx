export default function Home() {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-page flex-1 flex-col items-center justify-center gap-8 px-6 text-center'>
      <span className='text-caption-sm text-primary-500 uppercase'>
        Boundless
      </span>
      <h1 className='text-display-sm text-foreground'>
        The place to discover <span className='text-primary-500'>builders</span>
      </h1>
      <p className='max-w-xl text-body-lg text-muted-foreground'>
        Explore the builders, projects, and development teams shipping on
        Boundless. This app displays the work. Creating and uploading happens in
        the main Boundless app.
      </p>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <button className='bg-primary-500 text-ink hover:bg-primary-400 active:bg-primary-600 h-12 rounded-lg px-6 text-base font-medium transition-colors'>
          Explore builders
        </button>
        <button className='border-foreground/20 text-foreground/90 hover:border-foreground/35 hover:bg-foreground/6 h-12 rounded-lg border bg-transparent px-6 text-base font-medium transition-colors'>
          View projects
        </button>
      </div>
    </main>
  );
}
