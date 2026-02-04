import Image from "next/image";
import Search from "./Search";

const Hero = () => {
  return (
    <section className="flex justify-between items-center py-15 gap-5 max-sm:flex-col-reverse">
      <div>
        <h1 className="text-[39px] leading-11.75">
          Get best deals on flights tickets
        </h1>
        <p className="mt-5 max-w-128.75">
          <strong>FairDrop</strong> allows you to search for flights and setup
          price alerts whenever flight prices drop a certain threshold.
        </p>
        <Search />
      </div>

      <figure className="flex w-[30vw] max-xl:w-[40vw] max-sm:w-full flex-wrap h-96.5 rounded-lg overflow-hidden shrink-0 max-sm:h-45">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "50%", height: "50%" }}
          src="/images/airplane-1.jpg"
          alt="Airplane flying above sea"
          className="object-cover max-sm:hidden"
          preload={true}
        />
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "50%", height: "50%" }}
          src="/images/airplane.jpg"
          alt="Airplane flying in blue sky"
          className="object-cover max-sm:hidden"
          preload={true}
        />
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "50%" }}
          src="/images/in-airplane.jpg"
          alt="Person sitting in airplane"
          className="object-cover max-sm:h-full!"
          preload={true}
        />
      </figure>
    </section>
  );
};

export default Hero;
