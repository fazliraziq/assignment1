import { Injectable } from '@nestjs/common';
import { SocketService } from '../sockets/sockets.service';

export class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}
/**
 * Creation of Binary Tree from Scratch
 */
@Injectable()
export class BinaryTree<T> {
  constructor(
    private root: TreeNode<T> | null = null,
    private socket: SocketService,
  ) {}

  insert(value: T) {
    if (value !== undefined) {
      if (!this.root) {
        this.root = new TreeNode(value);
      } else {
        this.root = this.insertRec(this.root, value);
      }
    }
  }

  private insertRec(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (value !== undefined) {
      if (node === null) {
        return new TreeNode(value);
      }

      if (value < node.value) {
        node.left = this.insertRec(node.left, value);
      } else if (value > node.value) {
        node.right = this.insertRec(node.right, value);
      } else if (value === node.value) {
        this.socket.sendData(value);
      }
    }

    return node;
  }

  toJson() {
    return this.root;
  }
}
