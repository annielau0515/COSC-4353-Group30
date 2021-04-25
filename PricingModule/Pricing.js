// Creates a class for the pricing module
class Pricing {
    constructor() {
        // sets the current price to $1.50 and company profit factor to 10%
        this.current_price = 1.50
        this.profit_factor = .1
    }

    set_history(history) {
        // sets the history factor to 1% if the customer has history with the company and 0% otherwise
        if (history) {
            this.history_factor = .01
        }
        else {
            this.history_factor = .0
        }
    }

    set_location(location) {
        // sets the location factor to 2% if the customer lives in Texas and 4% otherwise
        if (location === 'TX') {
            this.location_factor = .02
        }
        else {
            this.location_factor = .04
        }
    }

    set_gallons(gallons) {
        // sets the gallons factor to 2% if more than 1000 gallons are ordered and 3% if less
        if (gallons > 1000) {
            this.gallons_factor = .02
        }
        else {
            this.gallons_factor = .03
        }
    }

    get_price() {
        this.margin = this.current_price * (this.location_factor - this.history_factor + this.gallons_factor + this.profit_factor)
        this.suggested_price = this.current_price + this.margin
        return this.suggested_price
    }
}

exports.Pricing = Pricing