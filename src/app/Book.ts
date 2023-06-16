export class Book{
    title: string;
    author: Array<String>;
    date:string;
    // category:string;
    category:Array<String>
    image:any;
    username:string;
    bookid:string;

    constructor(){
        this.username='';
        this.title='';
        this.author=[];
        this.date='';
        this.category=[];
        this.image='';
        this.bookid='';
    }
}