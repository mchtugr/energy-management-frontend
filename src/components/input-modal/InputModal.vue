<template>
  <b-modal
    size="lg"
    hide-footer
    v-bind="$attrs"
    :title="(type + ' Factory') | capitalize"
  >
    <b-form @submit.prevent="onSubmit">
      <!-- NAME & SIZE ROW -->
      <b-row>
        <b-col>
          <b-form-group label="Company name:" label-for="company" class="mb-2">
            <b-form-input
              type="text"
              v-model="formObj.name"
              placeholder="Enter Company Name"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Company Size"
            label-for="company-size"
            class="mb-2"
          >
            <b-form-input
              id="company-size"
              type="number"
              placeholder="Enter Company Size"
              v-model="formObj.company_size"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Memebership & Due Dates Row-->
      <b-row>
        <b-col>
          <b-form-group class="mb-2" label="Membership Date">
            <b-form-datepicker v-model="formObj.membership_date" required />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-2" label="Membership Due">
            <b-form-datepicker v-model="formObj.membership_due" required />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- CheckBox -->
      <b-form-checkbox
        name="gold-member"
        v-model="formObj.gold_member"
        class="mb-2"
      >
        <span class="mx-2">Gold Member</span>
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
  name: 'InputModal',
  props: {
    type: String,
    form: Object,
  },
  mixins: [filter],

  methods: {
    ...mapActions(['editFactory', 'addNewFactory']),
    onSubmit() {
      // edit target factory
      if (this.type === 'edit') {
        this.editFactory(this.formObj)
      } else {
        // create new factory
        this.addNewFactory(this.formObj)
      }
      this.$bvModal.hide('input-modal')
    },
  },
  computed: {
    formObj() {
      return this.form
    },
  },
}
</script>

<style lang="scss" src="./input-modal.scss"></style>
