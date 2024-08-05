import {registerSection} from '@pack/react';

import {Accordions} from './Accordions';
import {Banner} from './Banner';
import {Firework} from './Firework';
import {FormBuilder} from './FormBuilder';
import {HalfHero} from './HalfHero';
import {Hero} from './Hero';
import {Html} from './Html';
import {IconRow} from './IconRow';
import {Image} from './Image';
import {ImageTiles} from './ImageTiles';
import {Markdown} from './Markdown';
import {MarketingSignup} from './MarketingSignup';
import {PressSlider} from './PressSlider';
import {Product} from './Product';
import {ProductsGrid} from './ProductsGrid';
import {ProductsSlider} from './ProductsSlider';
import {ShoppableSocialVideo} from './ShoppableSocialVideo';
import {SocialImagesGrid} from './SocialImagesGrid';
import {TabbedTilesSlider} from './TabbedTilesSlider';
import {TestimonialSlider} from './TestimonialSlider';
import {TextBlock} from './TextBlock';
import {TilesSlider} from './TilesSlider';
import {TilesStack} from './TilesStack';
import {Video} from './Video';
import {VideoEmbed} from './VideoEmbed';

export function registerSections() {
  /* Product */
  registerSection(ShoppableSocialVideo, {name: 'shoppable-social-video'});
  registerSection(Product, {name: 'product'});
  registerSection(ProductsGrid, {name: 'products-grid'});
  registerSection(ProductsSlider, {name: 'products-slider'});
  /* Text */
  registerSection(TextBlock, {name: 'text-block'});
  registerSection(Markdown, {name: 'markdown'});
  registerSection(Accordions, {name: 'accordions'});
  registerSection(IconRow, {name: 'icon-row'});
  /* Heros */
  registerSection(Hero, {name: 'hero'});
  registerSection(Banner, {name: 'banner'});
  registerSection(HalfHero, {name: 'half-hero'});
  /* Media */
  registerSection(ImageTiles, {name: 'image-tiles'});
  registerSection(TilesStack, {name: 'tiles-stack'});
  registerSection(TilesSlider, {name: 'tiles-slider'});
  registerSection(TabbedTilesSlider, {name: 'tabbed-tiles-slider'});
  registerSection(Image, {name: 'image'});
  registerSection(Video, {name: 'video'});
  registerSection(VideoEmbed, {name: 'video-embed'});
  /* Social */
  registerSection(Firework, {name: 'firework'});
  registerSection(SocialImagesGrid, {name: 'social-images-grid'});
  /* Reviews */
  registerSection(PressSlider, {name: 'press-slider'});
  registerSection(TestimonialSlider, {name: 'testimonial-slider'});
  /* Forms */
  registerSection(FormBuilder, {name: 'form-builder'});
  registerSection(MarketingSignup, {name: 'marketing-signup'});
  /* HTML */
  registerSection(Html, {name: 'html'});
  /* Uncategorized */
}
