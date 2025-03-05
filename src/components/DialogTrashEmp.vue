<script>
export default {
	name: "DialogTrashEmp",
}
</script>

<script setup>
import { ref } from "vue"

defineProps({ emp: Object })
const emit = defineEmits(["submit"])
const dialog = ref()
</script>

<template>
	<div>
		<v-dialog v-model="dialog" maxWidth="400">
			<v-card>
				<template #prepend>
					<v-icon
						color="error"
						icon="mdi-alert-circle"
					/>
				</template>

				<template #title>
					<span class="text-error">Подтверждение удаления</span>
				</template>

				<v-card-text>
					Вы действительно хотите удалить сотрудника {{ emp.fio }}?
				</v-card-text>

				<template #actions>
					<v-spacer />

					<v-btn @click="() => dialog = false">
						Нет
					</v-btn>

					<v-btn color="error" @click="() => emit('submit')">
						Да
					</v-btn>
				</template>
			</v-card>

			<template #activator="actProps">
				<slot name="activator" v-bind="actProps" />
			</template>
		</v-dialog>
	</div>
</template>

<style scoped>
</style>
