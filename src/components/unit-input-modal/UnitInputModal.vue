<template>
  <b-modal
    size="lg"
    hide-footer
    v-bind="$attrs"
    :title="(type + ' Unit') | capitalize"
  >
    <b-form @submit.prevent="onSubmit">
      <!-- UNIT NAME -->
      <b-row>
        <b-col>
          <b-form-group :label="$t('Unit Name:')" label-for="unit" class="mb-2">
            <b-form-input
              type="text"
              v-model="formObj.unit_name"
              :placeholder="$t('Enter Unit Name')"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- START & END Dates Row-->
      <b-row>
        <b-col>
          <b-form-group class="mb-2" :label="$t('Start Date')">
            <b-form-datepicker v-model="formObj.date_start" required :placeholder="$t('No Date Selected')"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-2" :label="$t('End Date')">
            <b-form-datepicker v-model="formObj.date_end" required :placeholder="$t('No Date Selected')"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group class="mb-2" :label="$t('Total Usage')">
            <b-form-input
              type="number"
              v-model="formObj.usage"
              :placeholder="$t('Enter Total Usage Amount')"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-2" :label="$t('Total Fee')">
            <b-form-input
              type="number"
              v-model="formObj.usage_fee"
              :placeholder="$t('Enter Total Fee Amount')"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- CheckBox -->
      <b-form-checkbox
        name="hasDiscount"
        v-model="formObj.discount"
        class="mb-2"
      >
        <span class="mx-2">{{$t('Discounted Price')}}</span>
      </b-form-checkbox>
      <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary" class="mt-2 px-4">
          {{ type | capitalize }}
        </b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import filter from '../../mixins/filters'
import { mapActions } from 'vuex'
export default {
  name: 'UnitInputModal',
  props: {
    type: String,
    form: Object,
  },
  mixins: [filter],

  methods: {
    ...mapActions(['editUnit', 'addNewUnit']),
    onSubmit() {
      // edit target Unit
      if (this.type === 'edit') {
        this.editUnit(this.databaseForm)
      } else {
        // create new Unit
        this.addNewUnit(this.databaseForm)
      }
      this.$bvModal.hide('unit-input-modal')
    },
  },
  computed: {
    formObj() {
      return this.form
    },
    databaseForm() {
      return {
        id: this.formObj.id,
        unit_name: this.form.unit_name,
        factory_id: this.form.factory_id,
        date_range: `[${this.form.date_start},${this.form.date_end})`,
        usage: this.form.usage,
        usage_fee: this.form.usage_fee,
        discount: this.form.discount,
      }
    },
  },
}
</script>

<style lang="scss" src="./unit-input-modal.scss"></style>
