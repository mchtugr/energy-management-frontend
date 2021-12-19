<template>
  <b-modal size="md" hide-footer v-bind="$attrs">
    <h4 class="text-center my-3" v-if="target === 'factory'">
      Are you really sure to delete "{{ form.name }}" ?
    </h4>
    <h4 class="text-center my-3" v-else>
      Are you really sure to delete "{{ form.unit_name }}" Unit?
    </h4>
    <div class="d-flex justify-content-center mt-4">
      <b-btn variant="danger" class="mx-2" @click="removeRow"
        >Yes, I'm Sure</b-btn
      >
      <b-btn variant="outline-primary" class="mx-2" @click="hideDeleteModal"
        >Cancel
      </b-btn>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DeleteModal',
  props: { form: Object, target: String },
  methods: {
    ...mapActions(['removeFactory', 'removeUnit']),
    removeRow() {
      // if target is unit, delete target unit
      if (this.target === 'unit') {
        this.removeUnit({
          unit_id: this.form.id,
          factory_id: this.form.factory_id,
        })
        // delete target factory
      } else {
        this.removeFactory(this.form.id)
      }
      // hide modal
      this.$bvModal.hide('delete-modal')
    },
    hideDeleteModal() {
      this.$bvModal.hide('delete-modal')
    },
  },
}
</script>

<style lang="scss" src="./delete-modal.scss"></style>
