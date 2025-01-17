import {registerSection} from '@pack/react';

import {Accordions} from './Accordions';
import {Banner} from './Banner';
import {DemoProductsGrid, DemoShoppableSocialVideo} from './Demo';
import {Firework} from './Firework';
import {FormBuilder} from './FormBuilder';
import {HalfHero} from './HalfHero';
import {Hero} from './Hero';
import {Html} from './Html';
import {IconRow} from './IconRow';
import {Image} from './Image';
import {ImageTiles} from './ImageTiles';
import {ImageTilesGrid} from './ImageTilesGrid';
import {ImageTilesMosaic} from './ImageTilesMosaic';
import {Markdown} from './Markdown';
import {MarketingSignup} from './MarketingSignup';
import {PressSlider} from './PressSlider';
import {Product} from './Product';
import {ProductsGrid} from './ProductsGrid';
import {ProductsSlider} from './ProductsSlider';
import {ShoppableSocialVideo} from './ShoppableSocialVideo';
import {SocialMediaGrid} from './SocialMediaGrid';
import {TabbedTilesSlider} from './TabbedTilesSlider';
import {TestimonialSlider} from './TestimonialSlider';
import {TextBlock} from './TextBlock';
import {TilesSlider} from './TilesSlider';
import {TilesStack} from './TilesStack';
import {Video} from './Video';
import {VideoEmbed} from './VideoEmbed';

export function registerSections() {
  /* Product ---------- */
  registerSection(ShoppableSocialVideo, {name: 'shoppable-social-video'});
  registerSection(Product, {name: 'product'});
  registerSection(ProductsGrid, {name: 'products-grid'});
  registerSection(ProductsSlider, {name: 'products-slider'});

  /* Text ---------- */
  registerSection(TextBlock, {name: 'text-block'});
  registerSection(Markdown, {name: 'markdown'});
  registerSection(Accordions, {name: 'accordions'});
  registerSection(IconRow, {name: 'icon-row'});

  /* Hero ---------- */
  registerSection(Hero, {name: 'hero'});
  registerSection(HalfHero, {name: 'half-hero'});
  registerSection(Banner, {name: 'banner'});

  /* Featured Media ---------- */
  registerSection(ImageTiles, {name: 'image-tiles'});
  registerSection(ImageTilesGrid, {name: 'image-tiles-grid'});
  registerSection(ImageTilesMosaic, {name: 'image-tiles-mosaic'});
  registerSection(TabbedTilesSlider, {name: 'tabbed-tiles-slider'});
  registerSection(TilesSlider, {name: 'tiles-slider'});
  registerSection(TilesStack, {name: 'tiles-stack'});

  /* Media ---------- */
  registerSection(Image, {name: 'image'});
  registerSection(Video, {name: 'video'});
  registerSection(VideoEmbed, {name: 'video-embed'});

  /* Social */
  registerSection(Firework, {name: 'firework'});
  registerSection(SocialMediaGrid, {name: 'social-media-grid'});

  /* Reviews ---------- */
  registerSection(PressSlider, {name: 'press-slider'});
  registerSection(TestimonialSlider, {name: 'testimonial-slider'});

  /* Form ---------- */
  registerSection(FormBuilder, {name: 'form-builder'});
  registerSection(MarketingSignup, {name: 'marketing-signup'});

  /* HTML ---------- */
  registerSection(Html, {name: 'html'});

  /* Demo ---------- */
  registerSection(DemoShoppableSocialVideo, {
    name: 'demo-shoppable-social-video',
  });
  registerSection(DemoProductsGrid, {
    name: 'demo-products-grid',
  });

  /* Uncategorized ---------- */
}
