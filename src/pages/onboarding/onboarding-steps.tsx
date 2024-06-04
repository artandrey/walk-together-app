import {CarouselSlide} from './ui/carousel';
import RunnerView from './ui/runner-view';
import TwoRunnersView from './ui/two-runners-view';
import RunnersCompetition from './ui/runners-competition';

export const onboardingSlides: CarouselSlide[] = [
  {
    text: 'app that let you change your shape and habits unbelievably!',
    view: RunnerView,
  },
  {
    text: 'app that let you change your shape and habits unbelievably!',
    view: TwoRunnersView,
  },
  {
    text: 'app that let you change your shape and habits unbelievably!',
    view: RunnersCompetition,
  },
];
