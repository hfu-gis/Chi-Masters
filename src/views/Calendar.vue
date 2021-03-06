<!-- build with the vuetify calendar components (https://vuetifyjs.com/en/components/calendars) and a youtube tutorial
from @Traversy Media ---  https://www.youtube.com/watch?v=2NOsjTT1b_k&t=1736s-->

<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <!-- new event button-->
                    <v-btn style="color: #fff !important;" color="#ff9600" dark @click.stop="dialog = true">
                        New Event
                    </v-btn>
                    <!-- jump to today button -->
                     <v-btn class="mr-4 ml-4" style="color: #fff !important;" color="#ff9600" dark @click="setToday">
                         Today
                     </v-btn>
                     <!-- prev - next click button -->
                    <v-btn  color="#ff9600" @click="prev">
                        <v-icon small>mdi-chevron-left </v-icon>
                    </v-btn>
                    <v-btn  @click="next" color="#ff9600">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <!-- headline date -->
                    <v-toolbar-title class="ml-8" style="color: #000">{{ title }}</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn  v-on="on" class="mr-4 ml-4" style="color: #fff !important;" color="#ff9600" dark @click="setToday">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <!-- click button to chose timesteps-->
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Week</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <!-- new event dialog pop up -->
            <v-dialog v-model="dialog" max-width="700">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" type="text" style="color: #000 !important;" color ="#000" label="event name (required)"></v-text-field>
                            <v-text-field v-model="details" type="text" style="color: #000000" label="detail"></v-text-field>
                            <v-text-field v-model="start" type="date" style="color: #000000" label="start (required)"></v-text-field>
                            <v-text-field v-model="end" type="date" style="color: #000000" label="end (required)"></v-text-field>
                            <v-text-field v-model="color" type="color" style="color: #000000" label="color (click to open color menu)"></v-text-field>
                            <v-btn type="submit" color="primary"  class="mr-4" @click.stop="dialog = false">
                                create event
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDate" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" color="#ff9600" type="text" label="event name (required)"></v-text-field>
                            <v-text-field v-model="details" style="color: #000000" type="text" label="detail"></v-text-field>
                            <v-text-field v-model="start" style="color: #000000" type="date" label="start (required)"></v-text-field>
                            <v-text-field v-model="end" style="color: #000000" type="date" label="end (required)"></v-text-field>
                            <v-text-field v-model="color" style="color: #000000" type="color" label="color (click to open color menu)"></v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                                create event
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>
             <!--   calendar view -->
            <v-sheet height="600">
                <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="default"
                        :events="events"
                        :event-color="getEventColor"
                        :event-margin-bottom="3"
                        :now="today"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="setDialogDate"
                        @change="updateRange"
                ></v-calendar>
                <!-- pop up event -->
                <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        full-width
                        offset-x
                >
                    <v-card color="grey lighten-4" :width="350" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <div class="flex-grow-1"></div>
                        </v-toolbar>

                        <v-card-text>
                            <form v-if="currentlyEditing !== selectedEvent.id">
                                {{ selectedEvent.details }}
                            </form>
                            <form v-else>
                                <textarea-autosize
                                        v-model="selectedEvent.details"
                                        type="text"
                                        style="width: 100%"
                                        :min-height="100"
                                        placeholder="add note">
                                </textarea-autosize>
                            </form>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn text color="secondary" @click="selectedOpen = false">
                                close
                            </v-btn>
                            <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
                                edit
                            </v-btn>
                            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<!-- adding data -->
<script>
    import { db } from '@/main'
        export default {
        data: () => ({
            today: new Date().toISOString().substr(0, 10),
            focus: new Date().toISOString().substr(0, 10),
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            name: null,
            details: null,
            start: null,
            end: null,
            color: '#1976D2',
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            dialog: false,
            dialogDate: false
        }),
        mounted () {    //gets called when the component is mounted
            this.getEvents()
        },
        props : {
            user: Object,
            organization: String
        },
        /**
         * makes our day/week/month/4days button work
         * */
        computed: {
            title () {
                const { start, end } = this
                if (!start || !end) {
                    return ''
                }
                const startMonth = this.monthFormatter(start)
                const endMonth = this.monthFormatter(end)
                const suffixMonth = startMonth === endMonth ? '' : endMonth
                const startYear = start.year
                const endYear = end.year
                const suffixYear = startYear === endYear ? '' : endYear
                const startDay = start.day + this.nth(start.day)
                const endDay = end.day + this.nth(end.day)
                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'week':
                    case '4day':
                        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                }
                return ''
            },
            monthFormatter () {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            }
        },

        methods: {
            /**
             *
             * @returns {Promise<void>}
             */

            async getEvents () {       //returns promises
                let self = this;
                let snapshot = await db.collection('Users').doc(self.user.email).collection('EventsOpen').get()
                const events = []
                snapshot.forEach(doc => {
                    let appData = doc.data()
                    appData.id = doc.id
                    events.push(appData)
                })
                this.events = events
            },
            /**
             *sets dialog date
             */

            setDialogDate( { date }) {
                this.dialogDate = true
                this.focus = date
            },
            /**
             *sets the focus to the day that's parsed in with 'date'
             */
            viewDay ({ date }) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor (event) {
                return event.color
            },
            /**
             * sets the focus to the today's value
             */
            setToday () {
                this.focus = this.today
            },
            /**
             * sets the chosen type one back
             */
            prev () {
                this.$refs.calendar.prev()
            },
            /**
             *sets the chosen type one further
             */
            next () {
                this.$refs.calendar.next()
            },

            /**
             *adds new event to the organizations collection
             */
            async addEvent () {
                let self = this;
                if (this.name && this.start && this.end) {
                    db.collection('Organization').doc(self.organization).collection('Events').add({
                        name: this.name,
                        details: this.details,
                        start: this.start,
                        end: this.end,
                        color: this.color
                    }).then(() => {
                        db.collection('Users').get().then((res) => {
                            for(let i = 0; i < res.docs.length; i++){
                                db.collection("Users").doc(res.docs[i].id).collection('EventsOpen').add({
                                    name: this.name,
                                    details: this.details,
                                    start: this.start,
                                    end: this.end,
                                    color: this.color
                                })
                            }
                            this.getEvents();
                            this.name = '',
                            this.details = '',
                            this.start = '',
                            this.end = '',
                            this.color = ''
                        }).then(() => {
                            this.getEvents();
                        })
                    })
                } else {
                    alert('You must enter event name, start, and end time')
                }
            },
            /**
             * puts u in edit mode
             */
            editEvent (ev) {
                this.currentlyEditing = ev.id
            },
            /**
             *updates current event
             */
            async updateEvent (ev) {
                await db.collection('calEvent').doc(this.currentlyEditing).update({
                     details: ev.details
                })
                this.selectedOpen = false,
                    this.currentlyEditing = null
            },
            /**
             * deletes current event
             */
            async deleteEvent (ev) {
                await db.collection("calEvent").doc(ev).delete()
                this.selectedOpen = false,
                    this.getEvents()
            },
            /**
             * creating a function called open for the pop up window
             */
            showEvent ({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                }
                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }
                nativeEvent.stopPropagation()
            },
            /**
             *sets the suffix for our dates
             */
            updateRange ({ start, end }) {
                this.start = start
                this.end = end
            },
            nth (d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            }
        },
        watch: {
            user: function() {
                this.getEvents();
            }
        }
    }
</script>
<style scoped>
</style>
