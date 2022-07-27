import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useSWR from 'swr';
import bookImg from '../../public/book.webp';

const fetcher = url =>
  fetch(url)
    .then(res => res.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
      const title = data.querySelector('title').textContent;
      const link = data.querySelector('link').textContent;
      const lastBuildDate = data.querySelector('lastBuildDate').textContent;
      const items = Array.from(data.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
        pubDate: item.querySelector('pubDate').textContent,
        imageUrl: link + item.querySelector('enclosure').getAttribute('url'),
      }));
      return { title, lastBuildDate, items };
    });

export default function RightPane() {
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_RSS, fetcher, {
    refreshInterval: 10000000,
  });

  const hideRSS = !data || error;

  return (
    <div className="flex-centered">
      {!hideRSS && (
        <div className="rss-feed">
          <div className="rss-title">{data.title}</div>
          <ul className="rss-content">
            {data.items?.slice(0, 3).map(item => (
              <li key={item.link}>
                <motion.a href={item.link} className="rss-item" whileHover={{ x: 2 }}>
                  <div className="rss-image">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        loader={() => item.imageUrl}
                        unoptimized
                        alt="Post"
                        height="50px"
                        width="50px"
                        style={{ borderRadius: '100%' }}
                      />
                    ) : (
                      <div
                        style={{
                          height: '50px',
                          width: '50px',
                          backgroundColor: 'grey',
                          borderRadius: '100%',
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <div>{item.title}</div>
                    <div className="rss-date">
                      {format(new Date(item.pubDate), 'MMMM dd, yyyy')}
                    </div>
                  </div>
                </motion.a>
              </li>
            ))}
          </ul>
          <a className="see-all-link" href="https://pedromarquez.dev">
            See all posts
          </a>
        </div>
      )}

      <div className="announcement">
        <div className="rss-title">A new book is out!</div>
        <div className="announcement-content">
          <div className="announcement-text">
            <p>My latest book &quot;Backend Developer in 30 Days&quot; is out!</p>
            You can get it at{' '}
            <a href="https://www.amazon.com/dp/9355513216/ref=cm_sw_r_apa_i_V19CYDR26B3R3ST9QMPP_0">
              Amazon
            </a>
          </div>
          <a href="https://www.amazon.com/dp/9355513216/ref=cm_sw_r_apa_i_V19CYDR26B3R3ST9QMPP_0">
            <Image src={bookImg} height={150} width={150} alt="Book cover" />
          </a>
          <p className="book-quote">
            &quot;Acquire Skills on API Designing, Data Management, Application Testing, Deployment,
            Security and Performance Optimization&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
