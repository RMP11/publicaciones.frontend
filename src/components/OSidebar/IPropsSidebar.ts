import type { DrawerProps } from 'primevue/drawer';

export interface IPropsSidebar {
  modelValue: boolean;
  dismissable?: boolean;
  position?: DrawerProps['position'];
  title?: string;
  width?: string;
  isLoading?: boolean;
  hideActions?: boolean;
  hideHeader?: boolean;
  acceptFn?: () => Promise<boolean>;
  beforeAcceptFn?: () => Promise<boolean>;
  disable?: boolean;
  buttonText?: string;

  // solo para v-bind
  'onUpdate:modelValue'?: (args: IPropsSidebar['modelValue']) => void;
}
