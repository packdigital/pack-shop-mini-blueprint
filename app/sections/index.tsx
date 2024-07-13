import {registerSection} from '@pack/react';

import {Accordions} from './Accordions';
import {Banner} from './Banner';
import {HalfHero} from './HalfHero';
import {Hero} from './Hero';
import {Html} from './Html';
import {IconRow} from './IconRow';
import {Image} from './Image';
import {ImageTiles} from './ImageTiles';
import {Markdown} from './Markdown';
import {PressSlider} from './PressSlider';
import {ProductsGrid} from './ProductsGrid';
import {ProductsSlider} from './ProductsSlider';
import {ShoppableSocialVideo} from './ShoppableSocialVideo';
import {SocialImagesGrid} from './SocialImagesGrid';
import {TestimonialSlider} from './TestimonialSlider';
import {TextBlock} from './TextBlock';
import {TilesSlider} from './TilesSlider';
import {TilesStack} from './TilesStack';
import {Video} from './Video';
import {VideoEmbed} from './VideoEmbed';

export function registerSections() {
  registerSection(Accordions, {name: 'accordions'});
  registerSection(Banner, {name: 'banner'});
  registerSection(HalfHero, {name: 'half-hero'});
  registerSection(Hero, {name: 'hero'});
  registerSection(Html, {name: 'html'});
  registerSection(IconRow, {name: 'icon-row'});
  registerSection(Image, {name: 'image'});
  registerSection(ImageTiles, {name: 'image-tiles'});
  registerSection(Markdown, {name: 'markdown'});
  registerSection(PressSlider, {name: 'press-slider'});
  registerSection(ProductsGrid, {name: 'products-grid'});
  registerSection(ProductsSlider, {name: 'products-slider'});
  registerSection(ShoppableSocialVideo, {name: 'shoppable-social-video'});
  registerSection(SocialImagesGrid, {name: 'social-images-grid'});
  registerSection(TestimonialSlider, {name: 'testimonial-slider'});
  registerSection(TextBlock, {name: 'text-block'});
  registerSection(TilesSlider, {name: 'tiles-slider'});
  registerSection(TilesStack, {name: 'tiles-stack'});
  registerSection(Video, {name: 'video'});
  registerSection(VideoEmbed, {name: 'video-embed'});
}
