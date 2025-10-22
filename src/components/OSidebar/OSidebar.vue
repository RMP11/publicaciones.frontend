<template>
  <Drawer
    :visible="propsComponent.modelValue"
    :dismissable
    :position
    @update:visible="(val: boolean) => emit('update:modelValue', val)"
    class="dark:!bg-secondary-color] rounded-bl-xl rounded-tl-xl"
    :class="{
      'w-[90dvw]': propsComponent.width === '90',
      'w-[40dvw]': propsComponent.width === '40',
      '!w-auto min-w-[20rem]': !propsComponent.width,
      'p-dialog-maximized': propsComponent.width === 'full',
    }"
  >
    <template #container>
      <LoadingComponent v-if="propsComponent.isLoading || isWorking" />
      <SidebarHeader
        v-if="!propsComponent.hideHeader"
        :title
        :closeFn="() => emit('update:modelValue', false)"
      />
      <div class="overflow-y-auto p-5 h-full max-h-full">
        <slot></slot>
      </div>

      <footer v-if="!hideActions" class="flex sm:justify-between gap-16 items-center mx-5 py-5">
        <Button
          label="Cancelar"
          severity="secondary"
          class="w-full rounded-2xl pr-5 sm:max-w-48"
          icon="pi pi-times"
          outlined
          @click="() => emit('update:modelValue', false)"
        ></Button>
        <slot name="actionsSideBar"></slot>
        <Button
          :label="propsComponent.buttonText || 'Aceptar'"
          :disabled="disable || isLoading"
          icon="pi pi-check"
          aria-label="save"
          class="w-full !rounded-2xl pr-5 sm:max-w-48 dark:!bg-[#b8b0d0] dark:!text-[#392a63] !border-none"
          @click="onAccept"
        ></Button>
      </footer>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import LoadingComponent from '../LoadingComponent.vue';
import { type IPropsSidebar } from '@/components/OSidebar/IPropsSidebar';
import { computed, ref } from 'vue';

const propsComponent = withDefaults(defineProps<IPropsSidebar>(), {
  beforeAcceptFn: async () => true,
});

const emit = defineEmits<{
  'update:modelValue': [visible: boolean];
  accept: [void];
}>();

const isWorking = ref(false);
const isLoading = computed(() => {
  return isWorking.value || propsComponent.disable || propsComponent.isLoading;
});

async function onAccept() {
  if (!propsComponent.acceptFn) {
    emit('accept');
    return;
  }

  const isPassed = await propsComponent.beforeAcceptFn();

  if (!isPassed) return;

  isWorking.value = true;
  const result = await propsComponent.acceptFn?.();
  isWorking.value = false;

  if (!result) return;

  emit('accept');
  emit('update:modelValue', false);
}
</script>
