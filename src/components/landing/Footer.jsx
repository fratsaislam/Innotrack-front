import Image from 'next/image';

const Footer = () => {
  const contactInfo = [
    { icon: '/icons/viber.svg', text: '+213 01 23 45 67' },
    { icon: '/icons/ig.svg', text: 'innotrack' },
    { icon: '/icons/whatsapp.svg', text: '+213 00 58 74 99' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Our Mission', href: '#' },
    { name: 'Projects', href: '#' }
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <footer className="bg-gray-900 mt-20 md:mt-40 p-6 md:p-8 lg:p-10 text-white rounded-2xl max-w-7xl mx-auto">
        {/* Mobile Layout (stacked) */}
        <div className="flex flex-col gap-8 md:hidden">
          {/* CTA Section - Mobile First */}
          <div className="flex flex-col gap-6 items-center text-center">
            <h3 className="text-xl font-bold leading-tight">
              Don't hesitate to join us and share your project
            </h3>
            <a
              href="#"
              className="bg-orange-500 text-white py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 no-underline inline-block text-center font-medium"
            >
              Launch Your Startup
            </a>
          </div>

          {/* Quick Links - Mobile */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h3 className="text-xl font-bold">Quick links</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-lg text-gray-100 hover:text-orange-400 transition-colors duration-300 no-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section - Mobile */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h3 className="text-xl font-bold">Contact us</h3>
            <p className="text-lg">innotrack@gmail.com</p>
            <div className="flex flex-col gap-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-3 justify-center">
                  <Image
                    src={contact.icon}
                    alt={`Contact ${index + 1}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <p className="text-lg">{contact.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location - Mobile */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h3 className="text-xl font-bold">Location</h3>
            <div className="flex gap-3 items-center justify-center">
              <Image
                src="/icons/location.svg"
                alt="Location"
                width={24}
                height={24}
                className="w-6 h-6 flex-shrink-0"
              />
              <p className="text-lg">ESTIN Incubator</p>
            </div>
          </div>
        </div>

        {/* Tablet Layout (2 columns) */}
        <div className="hidden md:flex lg:hidden flex-col gap-8">
          {/* Top Row - CTA */}
          <div className="flex flex-col gap-6 items-center text-center">
            <h3 className="text-2xl font-bold leading-tight">
              Don't hesitate to join us and share your project
            </h3>
            <a
              href="#"
              className="bg-orange-500 text-white py-3 px-8 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 no-underline inline-block text-center font-medium"
            >
              Launch Your Startup
            </a>
          </div>

          {/* Bottom Row - Two Columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Quick Links & Contact */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 items-center text-center">
                <h3 className="text-xl font-bold">Quick links</h3>
                <ul className="list-none p-0 m-0 space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-lg text-gray-100 hover:text-orange-400 transition-colors duration-300 no-underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Contact & Location */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 items-center text-center">
                <h3 className="text-xl font-bold">Contact us</h3>
                <p className="text-lg">innotrack@gmail.com</p>
                <div className="flex flex-col gap-3">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3 justify-center">
                      <Image
                        src={contact.icon}
                        alt={`Contact ${index + 1}`}
                        width={24}
                        height={24}
                        className="w-6 h-6 flex-shrink-0"
                      />
                      <p className="text-lg">{contact.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center text-center">
                <h3 className="text-xl font-bold">Location</h3>
                <div className="flex gap-3 items-center justify-center">
                  <Image
                    src="/icons/location.svg"
                    alt="Location"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <p className="text-lg">ESTIN Incubator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (3 columns) */}
        <div className="hidden lg:flex items-start justify-between gap-12 xl:gap-16">
          {/* Left Column - Contact */}
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-2xl xl:text-3xl font-bold">Contact us</h3>
            <p className="text-lg xl:text-xl">innotrack@gmail.com</p>
            <div className="flex flex-col gap-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Image
                    src={contact.icon}
                    alt={`Contact ${index + 1}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <p className="text-lg xl:text-xl">{contact.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col gap-5 flex-1">
            <h3 className="text-2xl xl:text-3xl font-bold">Quick links</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-lg xl:text-xl text-gray-100 hover:text-orange-400 transition-colors duration-300 no-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - CTA & Location */}
          <div className="flex flex-col gap-8 flex-1 items-center text-center">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold leading-tight">
                Don't hesitate to join us and share your project
              </h3>
              <a
                href="#"
                className="bg-orange-500 text-white py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 no-underline inline-block text-center font-medium"
              >
                Launch Your Startup
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold">Location</h3>
              <div className="flex gap-3 items-center justify-center">
                <Image
                  src="/icons/location.svg"
                  alt="Location"
                  width={24}
                  height={24}
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-lg xl:text-xl">ESTIN Incubator</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;