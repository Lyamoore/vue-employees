<script setup>
import DialogTrashEmp from "./DialogTrashEmp.vue"

defineProps({
	isNew: Boolean,
	isChange: Boolean,
	currentEmp: Object,
})
const emit = defineEmits(["submit"])
</script>

<template>
	<v-row class="mt-4">
		<v-col v-if="isNew" cols="12">
			<v-btn
				:disabled="!isChange"
				type="submit"
				color="primary"
				block
			>
				<v-icon left>
					mdi-plus
				</v-icon>
				Добавить
			</v-btn>
		</v-col>

		<template v-else>
			<v-col cols="6">
				<DialogTrashEmp
					:emp="currentEmp"
					@submit="emit('submit')"
				>
					<template #activator="{ props }">
						<v-btn
							block
							outlined
							color="error"
							v-bind="props"
						>
							<v-icon left>
								mdi-delete
							</v-icon>
							Удалить
						</v-btn>
					</template>
				</DialogTrashEmp>
			</v-col>

			<v-col cols="6" class="text-right">
				<v-btn
					:disabled="!isChange"
					type="submit"
					color="primary"
					outlined
					block
				>
					<v-icon left>
						mdi-pencil
					</v-icon>
					Изменить
				</v-btn>
			</v-col>
		</template>
	</v-row>
</template>
