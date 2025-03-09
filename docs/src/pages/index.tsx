import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import "../css/home.css"
import message from "../../static/img/message_icon2.png"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header>
      <p className='text1'>ChatWave Documentation</p>
      <p className='text2'>Welcome to the official documentation for **ChatWave**, a powerful and user-friendly chat application.</p>


      <p className='text1'>Introduction</p>
      <div className="container2">
        <img src={message} alt="" />
        <p className='text2 text3'>ChatWave is designed to provide real-time communication with a smooth and intuitive user interface. Whether you're building a small chat room or integrating chat features into an existing app, ChatWave offers flexibility and ease of use.</p>
      </div>

      <p className='text1'>Features</p>
      <ul className='container3'>
        <li>Real-time messaging:** Send and receive messages instantly with WebSocket support.</li>
        <li>Message history:** View previous conversations with built-in storage.</li>
        <li>User authentication:** Integrate with third-party authentication services</li>
        <li>Customizable UI:** Easily style and customize the interface using tailwind.css</li>
      </ul>

      <p className='text1'>Labraries/frameworks</p>
      <ul className='container3'>
        <li>React:** A JavaScript library for building user interfaces.</li>
        <li>framer-motion: For animation</li>
        <li>Tailwind.css:** A utility-first CSS framework for quickly building custom designs.</li>
        <li>react-toggle-dark-mode:For providing Dark Mode in website</li>
      </ul>

      <p className='text1'>Installation</p>
      <p className='text2'>To get started with ChatWave, follow the installation steps below:</p>

      <div className="container3">
        <p style={{ fontWeight: "600" }}>1.Clone the repository from GitHub: </p>
        <pre className='text3'>
          <cod>
            {`git clone https://github.com/safarovsafar/Chatwave.git`}
          </cod>
        </pre>

        <p style={{ fontWeight: "600", marginTop: "30px" }}>2.Install dependencies</p>
        <pre className='text3'>
          <cod>
            {`npm install`}
          </cod>
        </pre>

        <p style={{ fontWeight: "600", marginTop: "30px" }}>2.Run project</p>
        <pre className='text3'>
          <cod>
            {`npm run dev`}
          </cod>
        </pre>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}
