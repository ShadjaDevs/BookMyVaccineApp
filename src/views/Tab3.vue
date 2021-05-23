<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-row>
        <ion-col size = "1">
          <ion-button @click="openStart">
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-title class = "mainTitle"> My Subscriptions </ion-title>
        </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <div v-if='!isAuthenticated'>
        <div v-for="(sub, index) in subscriptions" :key="sub">
        <ion-card>
            <ion-item>
            <ion-button @click="presentConfirm(index)" class = "floatingRight" slot="end">
              <ion-icon :icon="trash"/>
            </ion-button>
            <ion-card-content>
              Mode of contact: {{sub.modeOfContact}} <br>
              ZipCode: {{sub.zipCode}} <br>
              Date subscribed: {{ sub.dateSubscribed }} <br>
              Period: {{sub.period}}
            </ion-card-content>
            </ion-item>
        </ion-card>	
      </div>
      </div> -->
      <div>
        <div>
          <ion-item>
            <ion-searchbar 
              @ionInput="updateSearchUUID($event.target.value)" 
              placeholder="UUID"></ion-searchbar>
            <ion-spinner v-show="spinnerOn" name="dots"></ion-spinner>  
            <ion-button @click="findUUIDDetails()" slot="end">
              <ion-icon :icon="arrowForwardCircle"/>
            </ion-button>
          </ion-item>
        </div>
        <!-- <ion-card>
          <ion-item>
          <ion-card-content>
            UUID: {{ user.UUID }} <br>
            Email: {{ user.emailAddress }} <br>
            Mobile: {{ user.mobileNumber }} <br>
            Pincodes: {{ user.pinCodes }} <br>
            Age: {{ user.age }} <br>
            Vaccine Brand: {{ user.vaccineBrand }} <br>
            Vaccine Type: {{ user.vaccineType }} <br>
            Period: {{ user.period }} <br>
          </ion-card-content>
          <ion-button @click="editSubscription()" class = "floatingRight1" slot="end">
              <ion-icon :icon="create"/>
          </ion-button>
          <ion-button @click="presentConfirm(index)" class = "floatingRight2" slot="end">
              <ion-icon :icon="trash"/>
          </ion-button>
          </ion-item>
        </ion-card> -->
      </div>
      <div v-show="user.UUID" id="details">
        <ion-card>
          <ion-item>
          <ion-card-content>
            UUID: {{ user.UUID }}
          </ion-card-content>
          <ion-button @click="presentConfirm(index)" class = "floatingRight2" slot="end">
              <ion-icon :icon="trash"/>
          </ion-button>
          </ion-item>
        </ion-card>
        <ion-card v-show="!user.emailVerified">
          <ion-item>
            <ion-input type="numeric" name="emailOTP" @input="updateOTPEmail($event.target.value)"/>
          </ion-item>
          <p class="formInfo"> Please enter the 4 digit OTP sent to your email, it may also be in your spam box. You can edit your email down below, if needed. REMEMBER, no notifications will be sent if the email is not verified. </p>
          <ion-button v-if="userEmailOTP.length == 4" type="submit" @click="sendOTPInfo">SUBMIT</ion-button>
        </ion-card>
        <ion-card>
          <ion-item>
            <ion-card-content>
              Email: {{ user.emailAddress }}
            </ion-card-content>
            <ion-button v-show="!showEditEmail && !user.emailVerified" @click="showEditEmail=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditEmail">
          <ion-item>
            <ion-label position="floating">New Email</ion-label>
            <ion-input
              type="email"
              name="emailAddress"
              @input="validateInputEmail($event)"
              v-model="vv.emailAddress.$model"
            />
          </ion-item>
          <ion-item>
            <p class="formInfo"> Please enter a valid email address</p>
            <ion-button @click="showEditEmail=false; enableUpdate=true;" class = "floatingRight2" slot="end">
              <ion-icon :icon="closeCircle"/>
            </ion-button>
          </ion-item>
          </div>
        </ion-card>

        <!-- To Do - Open up -->
        <!-- <ion-card>
          <ion-item>
            <ion-card-content>
              Mobile: {{ user.mobileNumber }}
            </ion-card-content>
            <ion-button v-show="!showEditMobile" @click="showEditMobile=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditMobile">
            <ion-item>
              <ion-label position="floating">New Mobile Number</ion-label>
              <ion-input type="numeric" name="mobileNumber" @input="validateInputMobile($event)" v-model="vv.mobileNumber.$model"/>
            </ion-item>
            <ion-item>
              <p class="formInfo"> Please enter a valid mobile number</p>
              <ion-button @click="showEditMobile=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card> -->

        <ion-card>
          <ion-item>
            <ion-card-content>
              Pincodes: {{ user.pinCodes }}
            </ion-card-content>
            <ion-button v-show="!showEditPincodes" @click="showEditPincodes=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditPincodes">
            <ion-item>
              <ion-label position="floating">New Pincodes</ion-label>
              <ion-input type="text" name="pincodes" @input="validateInputPincodes($event)" v-model="vv.pinCodes.$model"/>
            </ion-item>
            <ion-item>
              <p class="formInfo"> You can add multiple pincodes. Please separate them using a comma. Ex - 560097,560096</p>
              <ion-button @click="showEditPincodes=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card>

        <ion-card>
          <ion-item>
            <ion-card-content>
              Age: {{ findAge(user.age) }}
            </ion-card-content>
            <ion-button v-show="!showEditAge" @click="showEditAge=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditAge">
            <ion-label position="floating">New Age</ion-label>
            <ion-item>
                <ion-list>
                  <ion-radio-group @click="validateInputAge($event)" v-model="vv.age.$model">
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
            <ion-item>
              <p class="formInfo"></p>
              <ion-button @click="showEditAge=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card>

        <ion-card>
          <ion-item>
            <ion-card-content>
              Vaccine Brand: {{ user.vaccineBrand }}
            </ion-card-content>
            <ion-button v-show="!showEditVaccineBrand" @click="showEditVaccineBrand=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditVaccineBrand">
            <ion-label position="floating">New Vaccine Brand</ion-label>
            <ion-item>
                <ion-list>
                  <ion-radio-group @click="validateInputVaccineBrand($event)" v-model="vv.vaccineBrand.$model">
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
                      <ion-radio slot="start" value="Both">></ion-radio>
                    </ion-item>
                  </ion-radio-group>
                </ion-list>
            </ion-item>
            <ion-item>
              <p class="formInfo"></p>
              <ion-button @click="showEditVaccineBrand=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card>

        <ion-card>
          <ion-item>
            <ion-card-content>
              Vaccine Type: {{ user.vaccineType }}
            </ion-card-content>
            <ion-button v-show="!showEditVaccineType" @click="showEditVaccineType=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditVaccineType">
            <ion-label position="floating">Vaccine Type</ion-label>
            <ion-item>
                <ion-list>
                  <ion-radio-group @click="validateInputVaccineType($event)" v-model="vv.vaccineType.$model" value="Both">
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
                      <ion-radio slot="start" value="Both">></ion-radio>
                    </ion-item>
                  </ion-radio-group>
                </ion-list>
            </ion-item>
            <ion-item>
              <p class="formInfo"></p>
              <ion-button @click="showEditVaccineType=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card>

        <ion-card>
          <ion-item>
            <ion-card-content>
              Period: {{ findPeriod(user.period) }}
            </ion-card-content>
            <ion-button v-show="!showEditPeriod" @click="showEditPeriod=true; enableUpdate=false;" class = "floatingRight2" slot="end">
              <ion-icon :icon="create"/>
            </ion-button>
          </ion-item>
          <div v-show="showEditPeriod">
            <ion-label position="floating">New Subscription Period</ion-label>
            <ion-item>
                <ion-list>
                  <ion-radio-group @click="validateInputPeriod($event)" v-model="vv.period.$model">
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
            <ion-item>
              <p class="formInfo"></p>
              <ion-button @click="showEditPeriod=false; enableUpdate=true;" class = "floatingRight2" slot="end">
                <ion-icon :icon="closeCircle"/>
              </ion-button>
            </ion-item>
          </div>
        </ion-card>
        <div v-show="showEditAge || showEditEmail || showEditMobile || showEditPeriod || showEditPincodes || showEditVaccineBrand || showEditVaccineType">
          <ion-button v-if="enableUpdate" type="submit" @click="sendUpdate">Update</ion-button>
          <ion-button v-else type="submit" disabled>Update</ion-button>
          <ion-spinner v-show="updateSpinnerOn" name="dots"></ion-spinner>
        </div>
      </div>
      <ion-alert-controller></ion-alert-controller>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
  IonButton,
  IonSpinner,
  IonCard,
  toastController,
  alertController } from '@ionic/vue';
//import ExploreContainer from '@/components/ExploreContainer.vue';
import { menuOutline, trash, create, closeCircle, arrowForwardCircle  } from 'ionicons/icons';
import { menuController } from "@ionic/vue";
import { mapState } from 'vuex';
import userService from '../services/user.service';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import { reactive, toRef } from "vue";
import APIService from '../services/APIService.js';


export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonSpinner,
  IonButton,
  IonCard },
  data() {
    return {
      model: '',
      subscriptionPeriod: 0,
      tempVV: {},
      userMobileOTP : '',
      userEmailOTP: '',
      validateMobileNumber: false,
      validateEmailID: false,
      showEditEmail: false,
      showEditMobile: false,
      showEditPincodes: false,
      showEditAge: false,
      showEditVaccineBrand: false,
      showEditVaccineType: false,
      showEditPeriod: false,
      searchUUID: '',
      searchUUIDError: '',
      enableUpdate: false,
      spinnerOn: false,
      updateSpinnerOn: false
    }
  },
  setup() {
    const { user } = userService();
    const fform = reactive({
      mobileNumber: "",
      emailAddress: "",
      pinCodes: "",
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
      emailAddress: { email },
      pinCodes: {required, minLength: minLength(6)},
      radius: { required },
      age: { required },
      vaccineBrand: { required },
      vaccineType: { required },
      period: { required }
    };
    const vv = useVuelidate(rules, {
      mobileNumber: toRef(fform, "mobileNumber"),
      emailAddress: toRef(fform, "emailAddress"),
      pinCodes: toRef(fform, "pinCodes"),
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
        { id: 3, text: '50km', value: 50, isActive: false },
        { id: 4, text: '100km', value: 100, isActive: false },
        { id: 5, text: '500km', value: 500, isActive: false }
      ];

    const ageOptions = [
      { val: '1', text: '18 - 44' },
      { val: '2', text: '45+' }
    ];

    const brandOptions = [
      { val: 'covaxin', text: 'Covaxin' },
      { val: 'covishield', text: 'Covishield' },
      { val: 'both', text: 'Both' }
    ];

    const typeOptions = [
      { val: 'Free', text: 'Free' },
      { val: 'Paid', text: 'Paid' },
      { val: 'Both', text: 'Both' }
    ];
    return {
      menuOutline, trash, user, create, closeCircle, arrowForwardCircle,
      onSubmit,
      vv,
      radiusOptions,
      ageOptions,
      brandOptions,
      typeOptions,
      subscriptionOptions
    }
  },
  computed: {
      ...mapState("auth", ['isAuthenticated'])
  },
  // created() {
  //   this.user = {
  //     UUID: '690dba0c-b376-47a9-a587-e800cab2f86e',
  //     age: '1',
  //     emailAddress: 'chandan.gohan3@gmail.com',
  //     emailVerified: true,
  //     mobileNumber: '',
  //     period: '7',
  //     pinCodes :[560001, 560002, 560003, 560097],
  //     vaccineBrand: "Both",
  //     vaccineType: "Both"
  //   }
  // },
methods: {
  async handleToast(m) {
      const toast = await toastController.create({
        color: 'dark',
        duration: 2000,
        position: 'bottom',
        message: m
      });

      await toast.present();
    },
  openStart() {
      menuController.open("mainMenu");
    },
  async deleteSub() {
      let api = new APIService;
      api.removeSubscription(this.user.UUID).then((response) => {
        if (response.status == 200) {
            this.handleToast('Subscription deleted');
            setTimeout(() => { this.resetData(); }, 1000);
        }
      });
  },
  async presentConfirm() {
    const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'ALERT',
          message: 'Are you sure you want to delete this subscription?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              // handler: () => {
              //   console.log('Cancel clicked');
              // }
            },
            {
              text: 'Yes',
              handler: () => {
                this.deleteSub();
              }
            }
        ]
        });
      return alert.present();
  },
  dateToString(dateObj) {
    let tempDate = new Date(dateObj);
    let dd = String(tempDate.getDate()).padStart(2, '0');
    let mm = String(tempDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = tempDate.getFullYear();
    let strToRet = dd + '-' + mm + '-' + yyyy;
    return strToRet; 
  },
  resetData(){
    this.user = {};
    this.showEditEmail = false;
    this.showEditMobile = false;
    this.showEditPincodes = false;
    this.showEditAge = false;
    this.showEditVaccineBrand = false;
    this.showEditVaccineType = false;
    this.showEditPeriod = false;
    this.searchUUID = false;
    this.searchUUIDError = false;
    this.enableUpdate = false;
  },
  formatDate(subscriptions) {
    subscriptions.forEach((sub) => {
        let subDate = new Date(sub.dateSubscribed);
        let dd = String(subDate.getDate()).padStart(2, '0');
        let mm = String(subDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = subDate.getFullYear();

        sub.dateSubscribed = dd + '/' + mm + '/' + yyyy;
    });
  },
  editSubscription() {
    this.vv.mobileNumber.$model = this.user.mobileNumber;
    this.vv.emailAddress.$model = this.user.emailAddress;
    this.vv.pinCodes.$model = this.user.pinCodes;
    this.vv.age.$model = this.user.age;
    this.vv.vaccineBrand.$model = this.user.vaccineBrand;
    this.vv.vaccineType.$model = this.user.vaccineType;
    this.vv.period.$model = this.user.period;
  },
  findAge(val) {
    let toRet = this.ageOptions.find((option) => { return option.val === val; });
    if (toRet) {
      return toRet.text;
    }
  },
  findPeriod(val) {
    let toRet = this.subscriptionOptions.find((option) => { return option.val == val; });
    if (toRet) {
      return toRet.text;
    }
  },
  diffInDays (date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  },
  findUUIDDetails() {
    this.spinnerOn = true;
    let api = new APIService();
    api.getUUIDDetails(this.searchUUID).then((response) => {
      if (response.status == 200) {
        let subData = response.data.subscription;
        this.user = {};

        this.user.UUID = subData.uuid;
        this.user.age = subData.old ? '2' : '1';
        this.user.emailAddress = subData.email;
        this.user.emailVerified = subData.verified_email;
        this.user.mobileNumber = subData.mobile ? subData.mobile : "";
        this.user.mobileVerified = subData.verified_mobile;
        this.user.startDate = subData.startDate;
        this.user.pinCodes = subData.pincodes;

        let startDate = new Date(subData.start_date);
        let endDate = new Date(subData.end_date);
        let diffInDays = this.diffInDays(startDate, endDate);

        this.user.period = diffInDays > 3650 ? 0 : diffInDays + 1; 

        this.user.vaccineBrand = subData.flavor == null ? "Both" : subData.flavor;
        this.user.vaccineType = subData.want_free == null ? "Both" : (subData.want_free ? "Free" : "Paid");

        this.enableUpdate = false;
        this.spinnerOn = false;
      }
    });
  },
  updateSearchUUID(val) {
    this.searchUUID = val;
  },
  validateInputEmail(event) {
      console.log(event);
      this.enableUpdate = true;
  },
  validateInputPincodes(event) {
    let pinCodes;
      if (this.showEditPincodes) {
      let inputText = event.target.value;
      inputText = inputText.replaceAll(' ', '');
      if (inputText.length < 6) {
        this.enableUpdate = false;
        return;
      }
      pinCodes = inputText.split(',');
      let reg = new RegExp('^\\d+$');
      let check = true;
      pinCodes.forEach((pin) => {
        if (reg.test(pin) && pin.length == 6 ) {
          pin = Number(pin);
        } else {
          if (pin != "") {
            check = false;
          }
        }
      });
      if (!check) {
        this.enableUpdate = false;
        return;
      } else {
        this.enableUpdate = true;
        this.vv.pinCodes.$model = pinCodes;
      }
    } else {
      this.vv.pinCodes.$model = pinCodes;
      this.enableUpdate = true;
    }
  },
  validateInputVaccineBrand(event) {
    this.vv.vaccineBrand.$model = event.target.value;
    if (this.showEditVaccineBrand) {
      if (['Covaxin', 'Covishield', 'Both'].indexOf(event.target.value) == -1) {
        this.enableUpdate = false;
        return;
      } 
    } 
    this.enableUpdate = true;
  },
  validateInputAge(event) {
    this.vv.age.$model = event.target.value;
    if (this.showEditAge) {
      if (['1', '2'].indexOf(event.target.value) == -1){
        this.enableUpdate = false;
        return;
      }
    } 
    this.enableUpdate = true;
  },
  validateInputVaccineType(event) {
    this.vv.vaccineType.$model = event.target.value;
    if (this.showEditVaccineType) {
      if (['Free', 'Paid', 'Both'].indexOf(event.target.value) == -1) {
        this.enableUpdate = false;
        return;
      }
    } 
    this.enableUpdate = true;
  },
  validateInputPeriod(event) {
    this.vv.period.$model = Number(event.target.value);
    if (this.showEditPeriod) {
      if (['1', '7', '30', '0'].indexOf(event.target.value) == -1) {
        this.enableUpdate = false;
        return;
      } 
    } 
    this.enableUpdate = true;
  },
  validateInputMobile(event = {}) {
    const isNumeric = (n)=> {
      return !isNaN(parseFloat(n)) && isFinite(n) && n>=0;
    };
    const isMobileNumberValid = (value) => {
      if(!value) {
        return false;
      }
        return isPossiblePhoneNumber(value, 'IN') === true && isNumeric(value);
    };

    if (this.showEditMobile) {
      this.vv.mobileNumber.$model = event.target ? event.target.value : "";
      if (!isMobileNumberValid(this.vv.mobileNumber.$model))
      {
        this.enableUpdate = false;
        return;
      }
    }
    this.enableUpdate = true;
  },
  sendUpdate() {
    this.updateSpinnerOn = true;
    let api = new APIService;
      let formData = {};

      if (this.showEditAge) {
        formData.old = this.vv.age.$model === "2";
      } else {
        formData.old = this.user.age === "2";
      }

      if (this.showEditVaccineType) {
        if (this.vv.vaccineType.$model != "Both") {
          formData.want_free = this.vv.vaccineType.$model === "Free";
        } else {
          formData.want_free = null;
        }
      }

      if (this.showEditVaccineBrand) {
        if (this.vv.vaccineBrand.$model != 'Both') {
          formData.flavor = this.vv.vaccineBrand.$model.toLowerCase();
        } else {
          formData.flavor = null;
        }
      }

      if (this.showEditPeriod) {
        let endDate = new Date(this.user.startDate);
            
        if (this.vv.period.$model != 0) {
            endDate.setDate(endDate.getDate() + Number(this.vv.period.$model) - 1);
        } else {
          endDate = null;
        }
        formData.end_date = endDate ? this.dateToString(endDate) : null;
      }

      let a = [];
      for (let i = 0; i < this.vv.pinCodes.$model.length; i ++) {
        a.push(Number(this.vv.pinCodes.$model[i]));
      }
      for (let i = 0; i < this.user.pinCodes.length; i ++) {
        a.push(this.user.pinCodes[i])
      }
      formData.pincodes = a;
      
      if (this.showEditMobile) {
        if (this.vv.mobileNumber.$model != "") {
          formData.mobile = Number(this.vv.mobileNumber.$model);
        }
      } else {
        if (this.user.mobileNumber != "") {
          formData.mobile = Number(this.user.mobileNumber);
        }
      }

      if (this.showEditEmail) {
        if (this.vv.emailAddress.$model != "") {
          formData.email = this.vv.emailAddress.$model;
        }
      } else {
        if (this.user.emailAddress != "") {
          formData.email = this.user.emailAddress;
        }
      }

      api.updateSubscription(formData, this.user.UUID).then((response) => {
        if (response.status == 200){
          this.UUID = response.data.uuid;
          this.validateEmailID = true;
          let temp = this.user;
          this.user = {
            UUID: formData.uuid || temp.UUID,
            mobileNumber: this.vv.mobileNumber.$model || temp.mobileNumber,
            emailAddress: this.vv.emailAddress.$model || temp.emailAddress,
            pinCodes: formData.pincodes || temp.pinCodes,
            age: this.vv.age.$model || temp.age,
            vaccineBrand: this.vv.vaccineBrand.$model || temp.vaccineBrand,
            vaccineType: this.vv.vaccineType.$model || temp.vaccineType,
            period: this.vv.period.$model || temp.period,
          };
          this.updateSpinnerOn = false;
          this.handleToast('Update completed successfully');
          this.resetUpdateData();
        }
      });
  },
  resetUpdateData() {
    this.vv.mobileNumber.$model = "";
    this.vv.emailAddress.$model = "";
    this.vv.pinCodes.$model = "";
    this.vv.age.$model = "";
    this.vv.vaccineBrand.$model = "";
    this.vv.vaccineType.$model = "";
    this.vv.period.$model = "";
    this.showEditEmail = false;
    this.showEditMobile = false;
    this.showEditPincodes = false;
    this.showEditAge = false;
    this.showEditVaccineBrand = false;
    this.showEditVaccineType = false;
    this.showEditPeriod = false;
  },
  sendOTPInfo() {
    let api = new APIService;
    let formData = {};
    if (this.userEmailOTP && this.userEmailOTP.length === 4) {
      formData.otp_email = Number(this.userEmailOTP);
    }
    api.postOTP(formData, this.user.UUID).then((response) => {
      if (response.status == 200) {
        if (response.data.success) {
          this.handleToast('OTP verified successfully');
          this.user.emailVerified = true;
          //console.log(this.userMobileOTP, this.userEmailOTP);
        } else {
        this.handleToast('Wrong OTP keyed in. Please check your OTP and try again.');
        }
      } 
    });
  },
  updateOTPEmail(value) {
    this.userEmailOTP = value;
  }
},
}
</script>
<style scoped>
.floatingRight1 {
  top:5px;
  right:42px;
  position: absolute;
}
.floatingRight2 {
  top:5px;
  right:5px;
  position: absolute;
}
.mainTitle {
  margin-left: 5px;
  padding-top: 10px;
}
.formInfo {
  font-size: 12px;
  font-style: italic;
  font-weight: 10;
  margin-top: 4px;
  color: grey;
  padding-right: 25px;
}
#details {
  margin-bottom: 80px !important;
}
</style>