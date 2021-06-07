<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-row>
          <ion-col>
            <ion-title class ="mainTitle">
              <div class="titleicon">
                <img alt="logo" height="40" src="../../public/assets/icon/android-chrome-192x192.png"> &ensp;BookMyVaccine | Subscribe  
              </div>
            </ion-title>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid fixed>
        <div v-show="!(validateMobileNumber || validateEmailID)">
          <form @submit.prevent="onSubmit" novalidate>
            <ion-card>
              <ion-card-header>
                <ion-card-title> What is BookMyVaccine? </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                Book my vaccine is an app designed to assist with finding vaccine slots near you.
              </ion-card-content>
              <ion-card-header>
                <ion-card-title> Why BookMyVaccine? </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ul>
                  <li>Automate your search for vaccine slots. BookMyVaccine checks for available slots <i><b>every 30 minutes</b></i>, and immediately emails you.</li>
                  <li>Expand you search to <i><b>multiple pincodes</b></i> near you, customize your preferences and get <i><b>tailored results</b></i>.</li>
              </ul>
                <p class="formInfo"><font color="red">Please use CoWIN app to book your slot with this information.</font></p>
              </ion-card-content>
              <!-- <ion-card-content> -->
                <!-- To Do - Open up -->
                <!-- <div>
                  <ion-item>
                    <ion-label position="floating">Mobile Number</ion-label>
                    <ion-input type="numeric" name="mobileNumber" v-model="vv.mobileNumber.$model"/>
                  </ion-item>
                  <p class="formInfo"> Please enter a valid mobile number</p>
                </div> -->
                <!-- <h4 class="success">Get notified of vaccine slots near you in 3 simple steps:</h4>
                <ol>
                <li>Enter your pincode and preferences</li>
                <li>Enter email address where you wish to be notified</li>
                <li>Verify your email with OTP</li>
                </ol>
                <h4 class="success">When suitable slots are identified, you will get an email from us.</h4>
                <h4 class="success"><font color="red">Use CoWIN app to book your slot with this information.</font></h4>
              </ion-card-content> -->
            </ion-card>

            <!-- Pincode entering area -->
            <ion-card>
              <ion-card-content>
                <ion-item>
                  <ion-label position="floating">Pincode<font color="red">*</font></ion-label>
                  <ion-input type="number" autocomplete="postal-code"
                    autofocus="true" clearInput="true" debounce="400"
                    enterkeyhint="next" inputmode="numeric" min="100000"
                    max="999999" name="pincode"
                    placeholder="6 digit pincode" required="true"
                    v-model="vv.pinCode.$model" @ionChange="changePincode"/>
                </ion-item>
                <p class="formInfo">Enter your nearest pincode</p>
                <p class="formInfo" v-if="vv.pinCode.$error && vv.pinCode.$model"><font color="red">Enter a six digit pincode!</font></p>
                <div class="map" id="radiusMap"></div>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-content>
                <ion-label position="floating">How far can the center be?</ion-label>
                <ion-item>
                  <ion-list>
                    <ion-radio-group v-model="vv.radius.$model" value="25"
                      @ionChange="changeRadius">
                      <ion-item >
                        <ion-label>{{radiusOptions[0].text}}</ion-label>
                        <ion-radio slot="start" value="5">></ion-radio>
                      </ion-item>
                      <ion-item >
                        <ion-label>{{radiusOptions[1].text}}</ion-label>
                        <ion-radio slot="start" value="10">></ion-radio>
                      </ion-item>
                      <ion-item >
                        <ion-label>{{radiusOptions[2].text}}</ion-label>
                        <ion-radio slot="start" value="25">></ion-radio>
                      </ion-item>
                      <!-- <ion-item >
                        <ion-label>{{radiusOptions[3].text}}</ion-label>
                        <ion-radio slot="start" value="50">></ion-radio>
                      </ion-item> -->
                    </ion-radio-group>
                  </ion-list>
                </ion-item>

                <ion-label position="floating">Age</ion-label>
                <ion-item>
                    <ion-list>
                      <ion-radio-group v-model="vv.age.$model" value="1">
                        <ion-item >
                          <ion-label>{{ageOptions[0].text}}</ion-label>
                          <ion-radio slot="start" value="1">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{ageOptions[1].text}}</ion-label>
                          <ion-radio slot="start" value="2">></ion-radio>
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                </ion-item>

                <ion-label position="floating">Brand</ion-label>
                <ion-item>
                    <ion-list>
                      <ion-radio-group v-model="vv.vaccineBrand.$model" value='Any'>
                        <ion-item >
                          <ion-label>{{brandOptions[0].text}}</ion-label>
                          <ion-radio slot="start" value="Covaxin">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{brandOptions[1].text}}</ion-label>
                          <ion-radio slot="start" value="Covishield">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{brandOptions[2].text}}</ion-label>
                          <ion-radio slot="start" value='Any'>></ion-radio>
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                </ion-item>

                <ion-label position="floating">Vaccine Type</ion-label>
                <ion-item>
                    <ion-list>
                      <ion-radio-group v-model="vv.vaccineType.$model" value='Any'>
                        <ion-item >
                          <ion-label>{{typeOptions[0].text}}</ion-label>
                          <ion-radio slot="start" value="Free">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{typeOptions[1].text}}</ion-label>
                          <ion-radio slot="start" value="Paid">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{typeOptions[2].text}}</ion-label>
                          <ion-radio slot="start" value='Any'>></ion-radio>
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                </ion-item>

                <ion-label position="floating">Receive alerts for</ion-label>
                <ion-item>
                    <ion-list>
                      <ion-radio-group v-model="vv.period.$model" value="0">
                        <ion-item >
                          <ion-label>{{subscriptionOptions[0].text}}</ion-label>
                          <ion-radio slot="start" value="1">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{subscriptionOptions[1].text}}</ion-label>
                          <ion-radio slot="start" value="7">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{subscriptionOptions[2].text}}</ion-label>
                          <ion-radio slot="start" value="30">></ion-radio>
                        </ion-item>
                        <ion-item >
                          <ion-label>{{subscriptionOptions[3].text}}</ion-label>
                          <ion-radio slot="start" value="0">></ion-radio>
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                </ion-item>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-content>
                <ion-item>
                  <ion-label position="floating">Email</ion-label>
                  <ion-input type="email" autocomplete="email"
                      clearInput="true" debounce="400"
                      enterkeyhint="next" inputmode="email" name="emailAddress"
                      required="true" v-model="vv.emailAddress.$model"/>
                </ion-item>
                <p class="formInfo"> Please enter a valid email address</p>
                <p class="formInfo" v-if="vv.emailAddress.$error && vv.emailAddress.$model"><font color="red">Enter a valid email address!</font></p>
                <ion-button :disabled="vv.$invalid || (!vv.emailAddress.$model && !vv.mobileNumber.$model)" type="submit" @click="sendInfo">
                  SUBMIT
                </ion-button>
                <p class="formInfo" v-if="vv.$invalid || (!vv.emailAddress.$model && !vv.mobileNumber.$model)">
                  <font color="red">
                    Enter valid pincode and email to submit!
                  </font>
                </p>
                <ion-spinner v-show="spinnerOn" name="dots"></ion-spinner>
                <p class="formInfo">
                  <b>Disclaimer:</b> BookMyVaccine.app is not an alternative to CoWIN or any other government recommended platform.
                  We periodically check for availabilities and send you a notification to help book a slot, we do NOT book an appointment on your behalf.
                  This site is in <b>BETA</b> and we do <b>NOT</b> guarantee accuracy of the information you have keyed in.
                  We request you to verify before proceeding.
                  By clicking <b>SUBMIT</b>, you agree that you have read and understood this disclaimer.
                </p>
              </ion-card-content>
            </ion-card>
          </form>
        </div>

        <!-- After submit UI -->
        <ion-card class="ion-text-center" v-show="validateEmailID && !otpVerified">
          <ion-card-header>
            <ion-card-title>Enter OTP</ion-card-title>
            <ion-card-subtitle>Verify your email</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-input type="numeric" clearInput="true" debounce="400"
                enterkeyhint="next" inputmode="numeric" min="0000"
                max="9999" placeholder="4 digit OTP"
                name="emailOTP" v-model="userEmailOTP"/>
            </ion-item>
            <p class="formInfo"> Please enter the <b>4 digit OTP sent to your email</b>, it may also be in your spam folder.</p>
            <ion-button :disabled="userEmailOTP.length != 4" type="submit" @click="sendOTPInfo">
                SUBMIT
            </ion-button>
            <p class="formInfo" v-show="userEmailOTP.length && (userEmailOTP.length != 4)">
                <font color="red">
                  OTP is 4 digits
                </font>
              </p>
            <p class="formInfo"> REMEMBER! Only verified emails get notifications</p>
          </ion-card-content>
        </ion-card>

        <ion-card class="ion-text-center" v-show="otpVerified">
          <ion-card-header>
            <ion-card-title>Success!</ion-card-title>
            <ion-card-subtitle>Your email is verified</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p>
              When there is a suitable slot matching your preferences, you will be notified by an email like below.
              <br>
              If there are more slots in other pincodes/centers, they will be listed similarly.
            </p>
            <img src="../assets/SampleNotification.png">
          </ion-card-content>
        </ion-card>

        <ion-card class="ion-text-center" v-show="otpVerified">
          <ion-card-header>
            <ion-card-title>Editing preferences</ion-card-title>
            <ion-card-subtitle>Copy this key to edit your preferences later</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p>
              Your key is <b><font color="green">{{ UUID }}</font></b>.
              <br>
              Please <b>copy it</b> and <b>store it</b> in a secure place in case you want to <b>make changes</b> to this request in the future.
            </p>
            <ion-button @click="copyUUID()">Copy Key</ion-button>
          </ion-card-content>
        </ion-card>
        <ion-card class="ion-text-center" v-show="otpVerified">
          <ion-card-content>
            <ion-button @click="goHome()">Go home</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonRadio, IonRadioGroup, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  toastController,
  alertController } from '@ionic/vue';

import { mapState } from 'vuex';

import useDataService from '../services/data.service';
import userService from '../services/user.service';
import { reactive, toRef } from "vue";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { isPossiblePhoneNumber } from 'libphonenumber-js';

import APIService from '../services/APIService.js';

import { Plugins } from '@capacitor/core';

import gmapsInit from '../gmaps';

export default  {
  name: 'Tab2',
  components: {
    IonRadio,
    IonRadioGroup,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSpinner,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  },
  data() {
    return {
      model: '',
      subscriptionPeriod: 0,
      tempVV: {},
      userMobileOTP : '',
      userEmailOTP: '',
      validateMobileNumber: false,
      validateEmailID: false,
      subscriptionData: {
        modeOfContact: [],
        pinCode: 0,
        radius: 0,
        age: '',
        vaccineBrand: '',
        vaccineType: '',
        dateSubscribed: ''
      },
      UUID: "",
      otpVerified: false,
      spinnerOn: false,
      geocoder: null,
      map: null,
      pincodeCircle: null
    }
  },
  setup() {
    const { pinCode, searchRadius } = useDataService();

    const { user } = userService();

    const { Clipboard } = Plugins;

    const fform = reactive({
      mobileNumber: "",
      emailAddress: "",
      pinCode: pinCode,
      radius: null,
      age: "",
      vaccineBrand: "",
      vaccineType: "",
      period: ""
    });
    const isMobileNumberValid = (value) => {
      if(!value) {
        return true;
      }
        return isPossiblePhoneNumber(value, 'IN') === true && isNumeric(value);
    };
    const isNumeric = (n)=> {
      return !isNaN(parseFloat(n)) && isFinite(n) && n>=0;
    }
    const rules = {
      mobileNumber: { isMobileNumberValid },
      emailAddress: { required, email },
      pinCode: {required, minLength: minLength(6), maxLength: maxLength(6), isNumeric},
      radius: { required },
      age: { required },
      vaccineBrand: { required },
      vaccineType: { required },
      period: { required }
    };
    const vv = useVuelidate(rules, {
      mobileNumber: toRef(fform, "mobileNumber"),
      emailAddress: toRef(fform, "emailAddress"),
      pinCode: toRef(fform, "pinCode"),
      radius: toRef(fform, "radius"),
      age: toRef(fform, "age"),
      vaccineBrand: toRef(fform, "vaccineBrand"),
      vaccineType: toRef(fform, "vaccineType"),
      period: toRef(fform, "period")
    });
    // handle the submit of the form, only called
    // if the form is valid
    const onSubmit = () => {
      vv.value.$touch();

      if (vv.value.$invalid) return;

      //console.log(vv);
      //alert("Form has been submitted! " + JSON.stringify(fform, null, 2));
      //console.log(fform);
    };
    const subscriptionOptions = [
      { val: 1, text: '1 day' },
      { val: 7, text: '7 days' },
      { val: 30, text: '30 days' },
      { val: 0, text: 'Till I cancel' },
    ];

    const radiusOptions = [
        { id: 0, text: '5km', value: 5, isActive: false},
        { id: 1, text: '10km', value: 10, isActive: false },
        { id: 2, text: '25km', value: 25, isActive: false },
        { id: 3, text: '50km', value: 50, isActive: false }
      ];

    const ageOptions = [
      { val: '1', text: '18 - 44' },
      { val: '2', text: '45+' }
    ];

    const brandOptions = [
      { val: 'covaxin', text: 'Covaxin' },
      { val: 'covishield', text: 'Covishield' },
      { val: 'Any', text: 'Any' }
    ];

    const typeOptions = [
      { val: 'Free', text: 'Free' },
      { val: 'Paid', text: 'Paid' },
      { val: 'Any', text: 'Any' }
    ];
    return {
      subscriptionOptions,
      pinCode,
      searchRadius,
      router: useRouter(),
      onSubmit,
      vv,
      radiusOptions,
      ageOptions,
      brandOptions,
      typeOptions,
      Clipboard,
      user
    }
  },
  computed: {
    ...mapState("auth", ['isAuthenticated'])
  },
  created() {
    this.vv.pinCode.$model = "";
    this.vv.radius.$model = "5";
    this.vv.vaccineBrand.$model = 'Any';
    this.vv.vaccineType.$model = 'Any';
    this.vv.period.$model = "0";
    this.vv.age.$model = "1";
  },
  methods: {
    async handleToast(m) {
      const toast = await toastController.create({
        color: 'dark',
        duration: 2000,
        message: m
      });
      await toast.present();
    },
    copyUUID() {
      this.Clipboard.write({
        string: this.UUID
      });
      this.handleToast('UUID copied');
    },
    goHome() {
      setTimeout(() => { this.presentConfirm(); }, 1000);
    },
    updateSubscription(event) {
      this.subscriptionPeriod = event.detail.value;
    },
    dateToString(dateObj) {
      if (dateObj === null) {
        return null;
      }
      let tempDate = new Date(dateObj);
      let dd = String(tempDate.getDate()).padStart(2, '0');
      let mm = String(tempDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = tempDate.getFullYear();
      let strToRet = dd + '-' + mm + '-' + yyyy;
      return strToRet; 
    },
    async presentConfirm() {
      const alert = await alertController
        .create({
          header: 'Reminder!',
          message: 'Did you copy your UUID?',
          buttons: [
            {
              text: 'No',
              role: 'cancel'
            },
            {
              text: 'Yes',
              handler: () => {
                this.resetData();
                this.$router.go();
              }
            }
          ]
        });
        return alert.present();
    },
    sendInfo(){
      this.spinnerOn = true;
      let api = new APIService;
      api.getNearByPinCodes(this.vv.pinCode.$model, this.vv.radius.$model).then((response) => {
        response.data.pincodes.push(Number(this.vv.pinCode.$model));
        let formData = {
          'old': false,
          'pincodes': response.data.pincodes,
          'start_date': '',
          'end_date': ''
        };

        formData.old = this.vv.age.$model === "2";
        
        if (this.vv.vaccineType.$model != 'Any') {
          formData.want_free = this.vv.vaccineType.$model === "Free";
        }

        if (this.vv.vaccineBrand.$model != 'Any') {
          formData.flavor = this.vv.vaccineBrand.$model.toLowerCase();
        }

        let startDate = new Date(),
            endDate = new Date();

        if (this.vv.period.$model != 0) {
            endDate.setDate(endDate.getDate() + Number(this.vv.period.$model) - 1);
        } else {
          endDate = null;
        }

        formData.start_date = this.dateToString(startDate);
        formData.end_date = this.dateToString(endDate);

        if (this.vv.mobileNumber.$model != "") {
          formData.mobile = Number(this.vv.mobileNumber.$model);
        }

        if (this.vv.emailAddress.$model != "") {
          formData.email = this.vv.emailAddress.$model;
        }

        api.postSubscription(formData).then((response) => {
          if (response.status == 200){
            this.handleToast('Request submitted successfully.');
            this.spinnerOn = false;
            this.UUID = response.data.uuid;
            if ('email' in formData) {
              this.validateEmailID = true;
              this.user = {
                UUID: this.UUID,
                mobileNumber: this.vv.mobileNumber.$model,
                emailAddress: this.vv.emailAddress.$model,
                pinCodes: formData.pincodes,
                age: this.vv.age.$model,
                vaccineBrand: this.vv.vaccineBrand.$model,
                vaccineType: this.vv.vaccineType.$model,
                period: this.vv.period.$model,
                emailVerified: false
              };
            }
          }
        })
      });
    },
    resetData(){
      this.validateMobileNumber = false;
      this.validateEmailID = false;
      this.vv.mobileNumber.$model = '';
      this.vv.emailAddress.$model = '';
      this.vv.pinCode.$model = '';
      this.vv.radius.$model = null;
      this.vv.age.$model = null;
      this.vv.vaccineBrand.$model = null;
      this.vv.vaccineType.$model = null;
      this.vv.period.$model = null;
      this.otpVerified = false;
    },
    sendOTPInfo() {
      let api = new APIService;
      let formData = {};
      if (this.userEmailOTP && this.userEmailOTP.length === 4) {
        formData.otp_email = Number(this.userEmailOTP);
      }
      api.postOTP(formData, this.UUID).then((response) => {
        if (response.status == 200) {
          if (response.data.success) {
            this.handleToast('OTP verified successfully');
            this.user.emailVerified = true;
            this.otpVerified = true;
            //console.log(this.userMobileOTP, this.userEmailOTP);
          } else {
          this.handleToast('Wrong OTP keyed in. Please check your OTP and try again.');
          }
        }
      });
    },
    changePincode(event) {
      if (event.type=="v-ion-change" && this.vv.pinCode.$model.length==6) {
        this.geocoder.geocode({
          address: this.vv.pinCode.$model,
          region: 'in',
          componentRestrictions: {
            'postalCode': this.vv.pinCode.$model,
            'country': 'IN'
          }
        }, (results, status) => {
          if (status == `OK`) {
            var result = results.find(item =>
              (item['geometry']['location_type']=='APPROXIMATE') &&
              (item['types'][0]=='postal_code'));

            this.map.setCenter(result.geometry.viewport.getCenter());
            this.map.fitBounds(result.geometry.viewport);

            this.pincodeCircle.setCenter(result.geometry.viewport.getCenter());
          }
        });
      }
    },
    changeRadius(event) {
      if (event.type=="v-ion-change") {
        this.pincodeCircle.setRadius(1000*parseInt(this.vv.radius.$model));
      }
    }
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      this.geocoder = new google.maps.Geocoder();
      this.map = new google.maps.Map(document.getElementById("radiusMap"), {
        center: { lat: 20.593684, lng: 78.96288 },
        zoom: 4.0,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      this.pincodeCircle = new google.maps.Circle({
        strokeColor: "#00FF00", // Green
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.35,
        map: this.map,
        center: { lat: 20.593684, lng: 78.96288 },
        radius: 5000,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
</script>
<style scoped>
#login {
  padding-top: 55px !important;
}
.formInfo {
  font-size: smaller;
  font-style: italic;
  font-weight: 500;
  margin-top: 4px;
}

.mainTitle {
  margin-left: 5px;
  padding-top: 10px;
}
.priority {
  color : red;
}
.titleicon {
  display: flex;
  align-items: center;
}
.map {
  width: 100%;
  /* height: 90%; */
  height: 25rem;
  /* height: 300px; */
}
</style>
