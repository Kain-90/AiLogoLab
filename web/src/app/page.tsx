'use client';

import { Tooltip, Skeleton, TextArea, Button, Link } from '@radix-ui/themes';
import { NavBar } from './components/toggle-theme';
import { useEffect, useState } from 'react';
import { Config } from '@/config';

export default function Home() {
  const [state, setState] = useState(false);
  const [logoDesc, setLogoDesc] = useState('');
  const [genIsLoading, setGenIsLoading] = useState(false);
  const [data, setData] = useState<GenerateLogo | null>(null);
  const navigation = [
    // { title: 'Features', path: '#' },
    // { title: 'Integrations', path: '#' },
    // { title: 'Customers', path: '#' },
    // { title: 'Pricing', path: '#' },
  ];
  const logoDescIsEmpty = logoDesc.trim() === '';

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.menu-btn')) setState(false);
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  interface GenerateLogo {
    image: string;
  }

  useEffect(() => {
    document.getElementById('image-view-container')?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [genIsLoading]);

  const generateLogo = async () => {
    const trimText = logoDesc.trim();
    if (trimText === '') {
      alert('Please input logo description');
      return;
    } else {
      setGenIsLoading(true);
      try {
        const data = await fetch(Config.BACKEND_BASE_URL + '/api/gen-logo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: trimText }),
        });
        const json: GenerateLogo = await data.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setGenIsLoading(false);
      }
    }
  };

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="#" onClick={(e) => e.preventDefault()}>
        Todo Logo
      </a>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  const ImageViewArea = () => (
    <>
      <div className="flex justify-center items-center sm:max-w-md md:max-w-lg">
        <img src="https://via.placeholder.com/150" alt="logo" />
      </div>
    </>
  );

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <header>
          <div className={`md:hidden ${state ? 'mx-2 pb-5' : 'hidden'}`}>
            <Brand />
          </div>
          <nav
            className={`pb-5 md:text-sm ${
              state
                ? 'absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent'
                : ''
            }`}
          >
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
              <Brand />
              <div
                className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                  state ? 'block' : 'hidden'
                } `}
              >
                <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {/* {navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-300 hover:text-gray-400">
                      <a href={item.path} className="block">
                        {item.title}
                      </a>
                    </li>
                  );
                })} */}
                  <li>
                    <Link
                      href="https://github.com/Kain-90/AiLogoLab"
                      target="_blank"
                      className="flex rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button"
                    >
                      Github Repo
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <section className="relative">
          <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
                Logo Creation, One-Click Solution
              </h2>
              <p className="max-w-2xl mx-auto text-gray-400">
                Describe your brand, and our AI instantly creates multiple logo
                designs. With real-time adjustments, quickly explore options to
                find your perfect brand logo.
              </p>
              <TextArea
                value={logoDesc}
                onChange={(e) => setLogoDesc(e.target.value)}
                resize="vertical"
                size="3"
                placeholder="Input logo description…"
                radius="full"
                className="w-full mx-auto min-h-[200px] sm:max-w-lg"
              />
              {logoDescIsEmpty ? (
                <Tooltip content="Please input your logo description first.">
                  <Button
                    className="w-full sm:w-auto shadow-lg"
                    onClick={generateLogo}
                    size="3"
                    variant="classic"
                    radius="large"
                    loading={genIsLoading}
                    disabled={logoDesc.trim() === ''}
                  >
                    Generate Logo
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  className="w-full sm:w-auto shadow-lg"
                  onClick={generateLogo}
                  size="3"
                  variant="classic"
                  radius="large"
                  loading={genIsLoading}
                  disabled={logoDesc.trim() === ''}
                >
                  Generate Logo
                </Button>
              )}
              <div className="flex justify-center items-center gap-x-4 text-gray-400 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                    </svg>
                  ))}
                </div>
                <p>
                  <span className="text-gray-100">5.0</span> by over 200 users
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
            style={{
              background:
                'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
            }}
          ></div>
        </section>
        {genIsLoading || data ? (
          <section className="relative min-h-">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
              <div className="space-y-5 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
                  Logo Preview
                </h2>
                <div
                  id="image-view-container"
                  className="sm:flex sm:space-x-5 sm:space-y-0 space-y-2 justify-center"
                >
                  {genIsLoading ? (
                    <>
                      <Skeleton width="150px" height="150px" />
                      <Skeleton width="150px" height="150px" />
                      <Skeleton width="150px" height="150px" />
                      <Skeleton width="150px" height="150px" />
                    </>
                  ) : (
                    <>
                      <ImageViewArea />
                      <ImageViewArea />
                      <ImageViewArea />
                      <ImageViewArea />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
