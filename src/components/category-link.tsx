/* eslint-disable react/no-array-index-key */
import { LayoutGroup, motion, useAnimation, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import { Callback, debouncer } from 'src/helpers/utils';
import { PostInfo } from 'src/models/data';

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

function getVariants(isLg: boolean) {
  if (isLg) {
    return {
      cardMotion: {
        rest: {
          scale: 1,
          zIndex: 2,
          transition: {
            type: 'linear',
            duration: 0.2,
            delayChildren: 2,
            when: 'beforChildren',
          },
        },
      },
      titleMotion: {
        rest: {
          opacity: 1,
          y: 1,
          width: '90%',
          borderTopRightRadius: 0,
          scale: 1,
          transition: {
            type: 'linear',
            duration: 0.2,
          },
        },
        hover: {},
      },
      imageMotion: {
        rest: {
          opacity: 0.2,
          transition: {
            type: 'linear',
            duration: 0.5,
          },
        },
        hover: {
          opacity: 0.3,
        },
      },
      descriptionMotion: {
        rest: {
          opacity: 1,
          y: 0,
          width: '100%',
          borderTopRightRadius: 0,
          transition: {
            type: 'linear',
            duration: 0.2,
          },
        },
      },
    };
  }
  const cardMotion = {
    rest: { flexGrow: 1, scale: 1, zIndex: 0, transition: { when: 'afterChildren' } },
    hover: {
      // flexGrow: shouldReduceMotion ? 1 : 2,
      scale: isLg ? 1 : 1.3,
      zIndex: 2,
      transition: {
        type: 'linear',
        duration: 0.2,
        delayChildren: 2,
        when: 'beforChildren',
      },
    },
  };

  const titleMotion: Variants = {
    rest: { y: 50, opacity: 1, borderTopRightRadius: '0.5em', width: '40%' },
    hover: {
      y: 0,
      width: '90%',
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
        duration: 0.5,
      },
    },
  };

  const descriptionMotion = {
    rest: { opacity: 0, delay: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'tween',
        ease: 'easeIn',
        delay: 0.2,
      },
    },
  };

  return { cardMotion, titleMotion, imageMotion, descriptionMotion };
}

export function CategoryLink({ post }: { post: PostInfo }) {
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const isLg = useMediaQuery('(max-width: 700px)');

  const { cardMotion, titleMotion, imageMotion, descriptionMotion } = getVariants(isLg);

  useEffect(() => {
    controls.start(isHovering ? 'hover' : 'rest');
  }, [isHovering, isLg]);

  const debouncedSetIsHovering = debouncer(500, (params: SetStateAction<boolean>) => {
    setIsHovering(params);
  });

  return (
    <motion.div
      key="my_category_link"
      className="category__link"
      variants={cardMotion}
      animate={controls}
      onHoverStart={() => {
        router.prefetch(`/${post.slug}`);
        debouncedSetIsHovering(true);
      }}
      onHoverEnd={() => {
        debouncedSetIsHovering(false);
      }}
    >
      <Link href={`/${post.slug}`} style={{ position: 'relative', display: 'block' }}>
        <motion.div
          style={{ position: 'absolute', zIndex: 3 }}
          animate={controls}
          variants={titleMotion}
          initial="rest"
          className="category__title"
        >
          {post.frontmatter.title}
        </motion.div>
        <div style={{ position: 'relative' }}>
          <motion.div
            variants={imageMotion}
            animate={controls}
            initial="rest"
            className="category__hero-wrapper"
          >
            <Image
              className="category__hero"
              style={{ zIndex: 0 }}
              src={post.frontmatter.hero_image}
              priority
              alt="Picture of the author"
              // When "responsive", similar to "fluid" from Gatsby
              // When "intrinsic", similar to "fluid" with maxWidth from Gatsby
              // When "fixed", similar to "fixed" from Gatsby
              layout="responsive"
              // Optional, similar to "blur-up" from Gatsby
              // placeholder="blur"
              // Optional, similar to "width" in Gatsby GraphQL
              width={500}
              // Optional, similar to "height" in Gatsby GraphQL
              height={isLg ? 300 : 500}
              objectFit="cover"
            />
          </motion.div>

          <motion.div
            className="category__description"
            animate={controls}
            initial="rest"
            variants={descriptionMotion}
          >
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
        {posts.map((post: any) => (
          <CategoryLink key={post?.slug} post={post} />
        ))}
      </LayoutGroup>
    </div>
  );
}

export default CategoryLinkSection;
