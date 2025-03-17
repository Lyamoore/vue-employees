<script setup>
defineProps({ isNew: Boolean })
const emit = defineEmits(["duplicateForm", "closeForm"])
</script>

<template>
	<v-btn
		v-if="!isNew"
		icon
		size="small"
		style="position: absolute; top: 8px; right: 40px; z-index: 1;"
		variant="text"
		@click="emit('duplicateForm')"
	>
		<v-icon>mdi-content-copy</v-icon>
	</v-btn>

	<v-btn
		id="save-btn-activator"
		icon
		size="small"
		style="position: absolute; top: 8px; right: 8px; z-index: 1;"
		variant="text"
		@click="emit('closeForm')"
	>
		<v-icon>mdi-close</v-icon>
	</v-btn>
</template>
