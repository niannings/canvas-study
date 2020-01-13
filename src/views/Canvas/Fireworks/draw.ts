import { color16 } from '@/utils';

interface IVector2D {
  x: number;
  y: number;
  getAngel: () => number;
}

class Vector2D implements IVector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getAngel() {
    return Math.atan(this.y / this.x)
  }
}

interface IBall {
  radius: number;
  color: string;
  globalAlpha: number;
  vx: number;
  vy: number;
  position: Vector2D;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  draw: () => void;
}

class Ball implements IBall {
  radius = 8;
  color = 'red';
  globalAlpha = 1;
  vx = 0;
  vy = 300;
  position: Vector2D;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement, options: {
    radius?: number;
    color?: string;
    globalAlpha?: number;
    vx: number,
    vy: number,
    position?: Vector2D
  }) {
    const height = canvas.offsetHeight;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.position = options.position ? options.position : new Vector2D(this.radius, height);
    this.vx = options.vx;
    this.vy = options.vy;
    this.color = options.color || 'red';
    this.radius = options.radius || 8;
    this.globalAlpha = options.globalAlpha || 1;
  }

  draw() {
    const { ctx, position, radius, color } = this;

    if (ctx) {
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.globalAlpha = this.globalAlpha;
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

export default function initial(canvas: HTMLCanvasElement, count = 10) {
  const ctx = canvas.getContext('2d');
  const frequency = 66;
  const g = 9.8 / frequency; // 重力加速度
  const V0 = 350 / frequency; // 初速度
  const fireBall = new Ball(canvas, { vx: 0, vy: V0 });
  let time = 0;
  let raf: number;
  let next: (value?: unknown) => void;

  setInterval(() => time++, 1000);
  fireBall.position.x = canvas.width / 2;

  new Promise(resolve => {
    next = resolve;
  }).then(() => {
    initial(canvas, count);
  });

  function clear() {
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function boom(position: Vector2D) {
    console.log('爆炸');
    const fireBalls = Array(count).fill(null).map((_, index) => {
      const angel = 2 * Math.PI / count * index;
      return new Ball(canvas, {
        radius: 4,
        color: color16(),
        vx: Math.cos(angel) * V0 * Math.random() * 1.2,
        vy: Math.sin(angel) * V0 * Math.random(),
        position: new Vector2D(position.x, position.y)
      });
    });

    function draw() {
      clear();
      for (let i = 0; i < fireBalls.length; i++) {
        const ball = fireBalls[i];
        ball.draw();
        ball.position.x += ball.vx;
        ball.position.y += -ball.vy;
        ball.vy -= g * time;

        if (ball.vy < -i) {
          fireBalls.splice(i, 1);
        }
      }

      if (fireBalls.length === 0) {
        window.cancelAnimationFrame(raf);
        next()
      } else {
        raf = window.requestAnimationFrame(draw);
      }

    }

    draw();
  }

  function draw() {
    if (ctx) {
      clear();
      fireBall.draw();
      fireBall.position.x += fireBall.vx;
      fireBall.position.y += -fireBall.vy;

      if (fireBall.vy <= 0) {
        window.cancelAnimationFrame(raf);
        time = 0;
        boom(fireBall.position);
      } else {
        fireBall.vy -= g * time;
        raf = window.requestAnimationFrame(draw);
      }
    }
  }

  draw();
}
