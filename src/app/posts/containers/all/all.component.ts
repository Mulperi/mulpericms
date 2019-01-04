import { Component } from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
  posts = [
    {
      id: '3',
      author: 'Mika Lakanen',
      date: '2019-01-01 15:03',
      title: 'Newest blog post',
      body:
        ''
    },
    {
      id: '2',
      author: 'Mika Lakanen',
      date: '2019-01-01 15:03',
      title: 'Second blog post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste commodi ad rerum quaerat harum distinctio necessitatibus aut pariatur maiores accusantium facere perspiciatis consectetur, animi repudiandae, tempora, sapiente officiis inventore dignissimos'
    },
    {
      id: '1',
      author: 'Mika Lakanen',
      date: '2019-01-01 15:03',
      title: 'First blog post',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste commodi ad rerum quaerat harum distinctio necessitatibus aut pariatur maiores accusantium facere perspiciatis consectetur, animi repudiandae, tempora, sapiente officiis inventore dignissimos'
    }
  ];
}
