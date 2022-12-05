import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Background() {
  return (
    <Image
      src={data[1].imgBase64}
      fill
      alt="Background"
    />
  );
}