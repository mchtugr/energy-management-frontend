<template>
  <b-modal size="md" hide-footer v-bind="$attrs">
    <h4 class="text-center my-3" v-if="target === 'factory'">
      {{$t('Are you really sure to delete factory?', {factory: form.name}) }}
    </h4>
    <h4 class="text-center my-3" v-else>
      {{$t('Are you really sure to delete unit?', {unit: form.unit_name}) }}
    </h4>
    <div class="d-flex justify-content-center mt-4">
      <b-btn variant="danger" class="mx-2" @click="removeRow"
        >{{$t("Yes, I'm Sure")}}</b-btn
      >
      <b-btn variant="outline-primary" class="mx-2" @click="hideDeleteModal"
        >{{$t('Cancel')}}
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
