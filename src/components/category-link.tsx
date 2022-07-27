/* eslint-disable react/no-array-index-key */
import { LayoutGroup, motion, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect, useState } from 'react';
import { debouncer } from 'src/helpers/utils';
import { PostInfo } from 'src/models/interfaces';

function ToParagraphs({
  posts,
  className,
  style,
}: {
  posts: Array<string>;
  className?: string;
  style: Record<string | number, string>;
}) {
  return (
    <div className={className} style={style}>
      {posts?.map((el, index) => (
        <p key={`description-p-${index}`}>{el}</p>
      ))}
    </div>
  );
}

ToParagraphs.defaultProps = { className: '' };

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

function getVariants({ isMd, isLg }: { isMd: boolean; isLg: boolean }) {
  if (!isMd) {
    const cardMotion = {
      rest: { flexGrow: 1, scale: 1, zIndex: 0 },
      hover: {
        scale: (isMd && 1) || (isLg && 1.1) || 1.5,
        zIndex: 3,
        transition: {
          type: 'linear',
          duration: 0.2,
          delayChildren: 0,
          when: 'beforChildren',
        },
      },
    };

    const titleMotion: Variants = {
      rest: { y: 50, borderTopRightRadius: '0.5em', width: '60%' },
      hover: {
        y: 0,
        width: '88%',
        borderTopRightRadius: 0,
        transition: {
          type: 'linear',
          duration: 0.2,
        },
      },
    };

    const imageMotion = {
      rest: { opacity: 1 },
      hover: {
        opacity: 0.3,
        transition: {
          type: 'linear',
          duration: 0.2,
        },
      },
    };

    const descriptionMotion = {
      rest: { opacity: 0 },
      hover: {
        opacity: 1,
        transition: {
          type: 'linear',
          duration: 0.2,
        },
      },
    };

    return { cardMotion, titleMotion, imageMotion, descriptionMotion };
  }
  return {
    cardMotion: {
      rest: {
        scale: 1,
        zIndex: 1,
      },
    },
    titleMotion: {
      rest: {
        opacity: 1,
        y: 1,
        x: 0,
        borderTopRightRadius: 0,
        scale: 1,
        transition: {
          type: 'linear',
          duration: 0.2,
        },
      },
      hover: { scale: 1.1, x: 10 },
    },
    imageMotion: {
      rest: {
        opacity: 1,
        transition: {
          type: 'linear',
          duration: 0.5,
        },
      },
      hover: {
        opacity: 0.8,
      },
    },
    descriptionMotion: {
      rest: {
        opacity: 0,
        y: 0,
        width: '100%',
        borderTopRightRadius: 0,
        transition: {
          type: 'linear',
          duration: 0.2,
        },
      },
      hover: {
        opacity: 1,
        y: 0,
      },
    },
  };
}

export function CategoryLink({ post }: { post: PostInfo }) {
  const isXL = useMediaQuery('(min-width: 700px)');
  const isLg = useMediaQuery('(max-width: 700px)');
  const isMd = useMediaQuery('(max-width: 500px)');

  const sizes = {
    xl: 800,
    lg: 500,
    md: 320,
  };

  const imageSize = sizes[isMd && 'md'] ?? sizes[isLg && 'lg'] ?? sizes[isXL && 'xl'] ?? 320;

  const { cardMotion, titleMotion, imageMotion, descriptionMotion } = getVariants({ isMd, isLg });

  return (
    <motion.div
      key="my_category_link"
      className="category__link"
      variants={cardMotion}
      custom={post.frontmatter.order}
      whileInView={isMd ? 'hover' : null}
      whileHover={!isMd ? 'hover' : null}
      initial="rest"
    >
      <Link href={`/${post.slug}`} style={{ position: 'relative', display: 'block' }}>
        <motion.div
          style={{ position: 'absolute', zIndex: 1 }}
          variants={titleMotion}
          className="category__title"
        >
          {post.frontmatter.title}
        </motion.div>
        <div style={{ position: 'relative' }}>
          <motion.div variants={imageMotion} className="category__hero-wrapper">
            <Image
              className="category__hero"
              style={{ zIndex: 0 }}
              src={post.frontmatter.hero_image}
              blurDataURL={post.frontmatter.hero_image_blur}
              priority
              alt="Picture of the author"
              // When "responsive", similar to "fluid" from Gatsby
              // When "intrinsic", similar to "fluid" with maxWidth from Gatsby
              // When "fixed", similar to "fixed" from Gatsby
              layout="responsive"
              // Optional, similar to "blur-up" from Gatsby
              placeholder="blur"
              // Optional, similar to "width" in Gatsby GraphQL
              width={500}
              // Optional, similar to "height" in Gatsby GraphQL
              height={imageSize}
              objectFit="cover"
            />
          </motion.div>

          <motion.div className="category__description" variants={descriptionMotion}>
            <ToParagraphs style={{ margin: '1em' }} posts={post.frontmatter.description} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryLinkSection({ posts }: { posts: Array<PostInfo> }) {
  return (
    <div className="category__list">
      <LayoutGroup>
        {posts.map((post: PostInfo) => (
          <CategoryLink key={post?.slug} post={post} />
        ))}
      </LayoutGroup>
    </div>
  );
}

export default CategoryLinkSection;
