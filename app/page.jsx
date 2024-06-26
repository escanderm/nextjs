import Feed from '@components/Feed'

const Home = () => (
  <section className="flex-center flex w-full flex-col">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center"> AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">
      Promptopia is am open-source AI prompting tool for modern world to
      discover, create and share creative prompts.
    </p>

    <Feed />
  </section>
)

export default Home
