export interface Order {
    id?: string,
    start: Date,
    end: Date,
    car_id: string,
    customer_id: string,
    sum: number,
    notes?: string
}