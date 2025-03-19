<script setup>
defineProps({ modelValue: Boolean })
const emit = defineEmits(["update:modelValue", "confirm", "cancel"])
</script>

<template>
	<v-dialog
		:modelValue="modelValue"
		maxWidth="400"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<v-card>
			<template #prepend>
				<v-icon
					color="warning"
					icon="mdi-alert"
				/>
			</template>

			<template #title>
				<span class="text-warning">Несохраненные изменения</span>
			</template>

			<v-card-text>
				У вас есть несохраненные изменения. Вы уверены, что хотите продолжить?
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn @click="emit('cancel')">
					Отмена
				</v-btn>
				<v-btn
					color="primary"
					@click="emit('confirm')"
				>
					Продолжить
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
